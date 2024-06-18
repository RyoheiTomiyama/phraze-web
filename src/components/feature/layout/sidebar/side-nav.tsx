import { Settings } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { layoutConfig } from '../config'
import { cn } from '@/lib/utils'

export const SideNav = () => {
  return (
    <>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <NavItem variant="/" />
        <NavItem variant="/dashboard" />
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Link>
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
