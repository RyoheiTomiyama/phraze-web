import { Pathname } from '@/lib/pathpida/pathnames'
import { Banana, Home } from 'lucide-react'

export const layoutConfig = {
  '/dashboard': {
    name: 'Dashboard',
    Icon: Home,
    isActive: (_) => true,
  },
  '/': {
    name: 'Top',
    Icon: Banana,
    isActive: (_) => false,
  },
} as const satisfies {
  [key in Pathname]?: {
    name: string
    Icon: React.ElementType
    isActive: (props: { pathname: string }) => {}
  }
}
