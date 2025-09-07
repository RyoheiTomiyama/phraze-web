import { cn } from '@/lib/utils'
import { PropsWithChildren, ReactNode } from 'react'

type LayoutWithSidebarProps = {
  className?: string
  sidebar?: ReactNode
}
export const LayoutWithSidebar = ({
  children,
  className,
  sidebar,
}: PropsWithChildren<LayoutWithSidebarProps>) => {
  return (
    <div
      className={cn('flex min-h-dvh w-full flex-col bg-muted/40', className)}
    >
      <aside
        className="
        fixed left-0 z-10 backdrop-blur-xs bg-background/50 sm:bg-background
        flex flex-row inset-x-0 h-11
        sm:flex-col sm:inset-y-0 sm:w-14 sm:h-auto sm:border-r sm:border-b-0
        "
      >
        {sidebar}
      </aside>
      <div
        className={cn(
          'flex flex-col gap-4 flex-auto min-h-dvh py-4 pt-14 sm:pt-4 sm:pl-14',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
