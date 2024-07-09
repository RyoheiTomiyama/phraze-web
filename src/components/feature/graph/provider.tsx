import { useAuthDispatchContext } from '@/components/feature/auth'
import { clientEnv } from '@/lib/env'
import { UrqlProvider, createClient } from '@/lib/urql'
import { PropsWithChildren, useMemo } from 'react'

export const GraphProvider = ({ children }: PropsWithChildren) => {
  const { getToken } = useAuthDispatchContext()

  const client = useMemo(() => {
    return createClient({
      url: clientEnv.NEXT_PUBLIC_GRAPH_API_URL,
      authHandler: async (utils) => {
        let token: string | undefined

        return {
          addAuthToOperation(operation) {
            if (!token) {
              return operation
            }
            return utils.appendHeaders(operation, {
              Authorization: `Bearer ${token}`,
            })
          },
          willAuthError(_operation) {
            return true
          },
          didAuthError(_error, _operation) {
            return false
          },
          async refreshAuth() {
            token = await getToken()
          },
        }
      },
    })
  }, [getToken])

  return <UrqlProvider client={client}>{children}</UrqlProvider>
}
