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
    <>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <NavItem variant="/" />
        <NavItem variant="/dashboard" />
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <NavAccount />
      </nav>
    </>
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
        'group flex h-9 w-9 items-center justify-center rounded-full transition-colors md:h-8 md:w-8',
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
