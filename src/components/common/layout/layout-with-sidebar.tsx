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
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        {sidebar}
      </aside>
      <div
        className={cn(
          'flex flex-col gap-4 flex-auto min-h-dvh py-4 sm:pl-14',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
