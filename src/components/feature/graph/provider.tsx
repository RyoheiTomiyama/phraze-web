import { useAuthDispatchContext } from '@/components/feature/auth'
import { clientEnv } from '@/lib/env'
import { UrqlProvider, createClient } from '@/lib/urql'
import { PropsWithChildren, useMemo } from 'react'

export const GraphProvider = ({ children }: PropsWithChildren) => {
  const { getToken, refreshToken } = useAuthDispatchContext()

  const client = useMemo(() => {
    console.log('urql client initialized')

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
          // 事前にJWT検証して期限切れを更新したい
          // async willAuthError(operation) {
          //   const result = await getTokenResult()
          //   const expired = new Date(result.expirationTime)

          //   // 期限が近い場合は、トークンを更新しておく
          //   if (expired < add(new Date(), { minutes: 5 })) {
          //     return refreshIdToken()
          //   }
          // },
          didAuthError(error, _operation) {
            return error.response.status === 401
          },
          async refreshAuth() {
            await refreshToken()
          },
        }
      },
    })
  }, [getToken, refreshToken])

  return <UrqlProvider client={client}>{children}</UrqlProvider>
}
