import { AuthConfig, AuthUtilities, authExchange } from '@urql/exchange-auth'
import { Kind } from 'graphql'
import { Client, cacheExchange, fetchExchange, mapExchange } from 'urql'
import { parseGQLError, ResponseError } from '../gql'
import { logger } from '../logger'

export const createClient = ({
  url,
  authHandler,
  debug = true,
}: {
  url: string
  authHandler: (utilities: AuthUtilities) => Promise<AuthConfig>
  debug?: boolean
}) => {
  return new Client({
    url,
    exchanges: [
      cacheExchange,
      authExchange(authHandler),
      mapExchange({
        onError(error) {
          const gqlError = parseGQLError(error)
          if (gqlError instanceof ResponseError) {
            if (gqlError.code < 500) {
              logger.warn(gqlError.message, { errors: gqlError.errors })
            } else {
              logger.error(gqlError.message, { errors: gqlError.errors })
            }
          }
        },
        onOperation(operation) {
          if (debug) {
            operation.query.definitions.forEach((def) => {
              if (def.kind === Kind.OPERATION_DEFINITION) {
                logger.debug(def.operation, def.name?.value)
              }
            })
          }

          return operation
        },
      }),
      fetchExchange,
    ],
  })
}
