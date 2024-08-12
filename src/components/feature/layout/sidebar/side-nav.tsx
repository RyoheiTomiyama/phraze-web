import { CircleUser } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { layoutConfig } from '../config'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthContext, useAuthDispatchContext } from '../../auth'
import { pagesPath } from '@/lib/pathpida/$path'

export const SideNav = () => {
  return (
    <div className="flex-auto flex flex-row items-center gap-4 px-6 sm:px-0 sm:py-4 sm:flex-col">
      <nav className="flex-auto flex sm:flex-col items-center gap-4 ">
        {/* <NavItem variant="/" /> */}
        <NavItem variant="/dashboard" />
      </nav>
      <nav className="flex flex-col items-center gap-4">
        <NavAccount />
        el
      </nav>
    </div>
  )
}

const NavItem = ({ variant }: { variant: keyof typeof layoutConfig }) => {
  const router = useRouter()
  const { Icon, name, isActive } = layoutConfig[variant]
  const active = isActive({ pathname: router.pathname })

  return (
    <Link
      href={{ pathname: variant }}
      className={cn(
        'group flex h-8 w-8 items-center justify-center rounded-full transition-colors',
        active
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground transition-colors hover:text-foreground',
      )}
    >
      <Icon
        className={cn(
          active ? 'h-4 w-4 transition-all group-hover:scale-110' : 'h-5 w-5',
        )}
      />
      <span className="sr-only">{name}</span>
    </Link>
  )
}

const NavAccount = () => {
  const router = useRouter()
  const { user } = useAuthContext()
  const { logout } = useAuthDispatchContext()

  const handleLogout = () => {
    logout()

    router.push(pagesPath.$url())
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <CircleUser className="h-6 w-6" />
        <span className="sr-only">Settings</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="right" align="end">
        <DropdownMenuLabel className="line-clamp-1">
          {user?.name ?? 'unknown'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
