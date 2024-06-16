import { LayoutWithSidebar } from '@/components/common/layout'
import { Heading } from '@/components/ui/heading'
import React, { PropsWithChildren } from 'react'
import { SideNav } from './sidebar/side-nav'

type DefaultLayoutProps = {
  title: string
}

export const DefaultLayout = ({
  title,
  children,
}: PropsWithChildren<DefaultLayoutProps>) => {
  return (
    <LayoutWithSidebar sidebar={<SideNav />}>
      <header className="container">
        <Heading variant="h1">{title}</Heading>
      </header>
      <main className="container">{children}</main>
    </LayoutWithSidebar>
  )
}
