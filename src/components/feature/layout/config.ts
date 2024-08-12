import { Pathname } from '@/lib/pathpida/pathnames'
import { Banana, Home } from 'lucide-react'

export const layoutConfig = {
  '/dashboard': {
    name: 'Dashboard',
    Icon: Home,
    isActive: ({ pathname }) => {
      const p: Pathname = '/dashboard'
      return pathname === p
    },
  },
  '/': {
    name: 'Top',
    Icon: Banana,
    isActive: (_) => {
      return false
    },
  },
} as const satisfies {
  [key in Pathname]?: {
    name: string
    Icon: React.ElementType
    isActive: (props: { pathname: string }) => boolean
  }
}
