import {
  getIdToken,
  refreshIdToken,
  signInGoogle,
  signOut,
  verify,
} from '@/lib/firebase'
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type User = { name: string }

type State = { loading: boolean } & (
  | {
      user: User
      isLogin: true
    }
  | {
      user?: undefined
      isLogin?: false
    }
)

type Provider = 'google'

export const context = createContext<State>({ isLogin: false, loading: true })

export const dispatchContext = createContext<{
  getToken: () => Promise<string | undefined>
  refreshToken: () => Promise<string | undefined>
  login: (provider: Provider) => Promise<boolean>
  logout: () => Promise<void>
}>({
  getToken: () => {
    throw new Error('do not implement')
  },
  refreshToken: () => {
    throw new Error('do not implement')
  },
  login: () => {
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return verify((firebaseUser) => {
      setUser({
        name: firebaseUser?.displayName ?? 'unknown',
      })
      setLoading(false)
    })
  }, [])

  const value = useMemo(() => {
    if (user) {
      return { user, isLogin: true as const, loading }
    }
    return { user: undefined, isLogin: false as const, loading }
  }, [loading, user])

  const dispatch = useMemo(() => {
    const getToken = getIdToken
    const refreshToken = refreshIdToken
    const login = async (provider: Provider) => {
      switch (provider) {
        case 'google': {
          return signInGoogle()
        }
        default: {
          throw new Error(`failed login: invalid provider: ${provider}`)
        }
      }
    }
    const logout = async () => {
      await signOut()
      setUser(undefined)
    }

    return { getToken, refreshToken, login, logout }
  }, [])

  return (
    <context.Provider value={value}>
      <dispatchContext.Provider value={dispatch}>
        {children}
      </dispatchContext.Provider>
    </context.Provider>
  )
}
