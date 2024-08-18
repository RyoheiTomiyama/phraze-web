import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Theme, ThemeState } from './theme-state'
import { ThemeDispatch } from './theme-dispatch'

const themeContext = createContext<ThemeState>({
  theme: 'system',
})
const dispatchThemeContext = createContext<ThemeDispatch>({
  setTheme: () => {
    throw new Error('')
  },
})

type ThemeProviderProps = {
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'phraze-theme',
  ...props
}: PropsWithChildren<ThemeProviderProps>) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme
    }

    return (localStorage.getItem(storageKey) as Theme) || defaultTheme
  })

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const handleTheme = useCallback(
    (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    [storageKey],
  )

  return (
    <themeContext.Provider {...props} value={{ theme }}>
      <dispatchThemeContext.Provider value={{ setTheme: handleTheme }}>
        {children}
      </dispatchThemeContext.Provider>
    </themeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(themeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
