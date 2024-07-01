import { AuthConfig, AuthUtilities, authExchange } from '@urql/exchange-auth'
import { Client, cacheExchange, fetchExchange } from 'urql'

export const createClient = ({
  url,
  authHandler,
}: {
  url: string
  authHandler: (utilities: AuthUtilities) => Promise<AuthConfig>
}) => {
  return new Client({
    url,
    exchanges: [cacheExchange, authExchange(authHandler), fetchExchange],
  })
}
