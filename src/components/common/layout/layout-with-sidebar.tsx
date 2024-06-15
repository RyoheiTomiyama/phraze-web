import { PropsWithChildren, ReactNode } from 'react'

type LayoutWithSidebarProps = {
  sidebar?: ReactNode
}
export const LayoutWithSidebar = ({
  children,
  sidebar,
}: PropsWithChildren<LayoutWithSidebarProps>) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        {sidebar}
      </aside>
      <main className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        {children}
      </main>
    </div>
  )
}
