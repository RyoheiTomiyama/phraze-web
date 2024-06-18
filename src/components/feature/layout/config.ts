import { Pathname } from '@/lib/pathpida/pathnames'

export const LayoutConfig = {
  '/dashboard': {
    name: 'Dashboard',
  },
  '/deck/[id]/edit': {
    name: 'Deck編集',
  },
} as const satisfies {
  [key in Pathname]?: {
    name: string
  }
}
