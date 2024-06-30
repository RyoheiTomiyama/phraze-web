import {
  useAuthContext,
  useAuthDispatchContext,
} from '@/components/feature/auth'
import { clientEnv } from '@/lib/env'
import { UrqlProvider, createClient } from '@/lib/urql'
import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import useMountedState from '@/hook/useMountedState'

export const GraphProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string>()
  const { logined } = useAuthContext()
  const { getToken } = useAuthDispatchContext()
  const mounted = useMountedState()

  useEffect(() => {
    if (logined) {
      getToken().then((token) => {
        if (mounted()) {
          setToken(token)
        }
      })
    } else {
      setToken(undefined)
    }
  }, [getToken, logined, mounted])

  const client = useMemo(() => {
    // TODO header詰める
    console.log(token)
    return createClient(clientEnv.NEXT_PUBLIC_GRAPH_API_URL)
  }, [token])

  return <UrqlProvider client={client}>{children}</UrqlProvider>
}
