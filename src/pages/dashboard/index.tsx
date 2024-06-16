import { LayoutWithSidebar } from '@/components/common/layout'
import { SideNav } from '@/components/common/layout/sidebar/side-nav'
import { DeckTable } from '@/components/feature/deck'
import { Heading } from '@/components/ui/heading'

export default function DashboardPage() {
  return (
    <LayoutWithSidebar sidebar={<SideNav />}>
      <header className="container">
        <Heading variant="h1">Dashboard</Heading>
      </header>
      <main className="container">
        <DeckTable />
      </main>
    </LayoutWithSidebar>
  )
}
