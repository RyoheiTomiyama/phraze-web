import { getIdToken, refreshIdToken, signOut, verify } from '@/lib/firebase'
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type User = { name: string }

type State =
  | {
      user: User
      isLogin: true
    }
  | {
      user?: undefined
      isLogin?: false
    }

export const context = createContext<State>({ isLogin: false })

export const dispatchContext = createContext<{
  getToken: () => Promise<string | undefined>
  refreshToken: () => Promise<string | undefined>
  logout: () => Promise<void>
}>({
  getToken: () => {
    throw new Error('do not implement')
  },
  refreshToken: () => {
    throw new Error('do not implement')
  },
  logout: () => {
    throw new Error('do not implement')
  },
})

export const useAuthContext = () => {
  return useContext(context)
}

export const useAuthDispatchContext = () => {
  return useContext(dispatchContext)
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    return verify((firebaseUser) => {
      setUser({
        name: firebaseUser?.displayName ?? 'unknown',
      })
    })
  }, [])

  const value = useMemo(() => {
    if (user) {
      return { user, isLogin: true as const }
    }
    return { user: undefined, isLogin: false as const }
  }, [user])

  const dispatch = useMemo(() => {
    const getToken = getIdToken
    const refreshToken = refreshIdToken
    const logout = signOut

    return { getToken, refreshToken, logout }
  }, [])

  return (
    <context.Provider value={value}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </context.Provider>
  )
}
