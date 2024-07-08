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
        const token = await getToken()
        return {
          addAuthToOperation(operaion) {
            if (!token) {
              return operaion
            }
            return utils.appendHeaders(operaion, {
              Authorization: `Bearer ${token}`,
            })
          },
          didAuthError(_error, _operation) {
            return false
          },
          async refreshAuth() {
            // await refreshToken()
          },
        }
      },
    })
  }, [getToken])

  return <UrqlProvider client={client}>{children}</UrqlProvider>
}
