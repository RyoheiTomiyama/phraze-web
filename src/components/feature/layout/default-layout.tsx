import { LayoutWithSidebar } from '@/components/common/layout'
import { Heading } from '@/components/ui/heading'
import React, { PropsWithChildren } from 'react'
import { SideNav } from './sidebar/side-nav'

type DefaultLayoutProps = {
  title: string
  className?: string
}

export const DefaultLayout = ({
  title,
  className,
  children,
}: PropsWithChildren<DefaultLayoutProps>) => {
  return (
    <LayoutWithSidebar sidebar={<SideNav />} className={className}>
      <header className="container">
        <Heading variant="h1">{title}</Heading>
      </header>
      <main className="container flex flex-col flex-auto overflow-hidden">
        {children}
      </main>
    </LayoutWithSidebar>
  )
}
