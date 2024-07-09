import { PropsWithChildren, useEffect } from 'react'
import { useAuthContext } from './auth-provider'
import { useRouter } from 'next/router'
import { pagesPath } from '@/lib/pathpida/$path'

export const AuthRequired = ({ children }: PropsWithChildren) => {
  const router = useRouter()
  const { loading, isLogin } = useAuthContext()

  useEffect(() => {
    if (!loading && !isLogin) {
      router.push(pagesPath.$url())
    }
  }, [isLogin, loading, router])

  if (loading) {
    return <>loading...</>
  }

  return children
}
