import { DeckTable } from '@/components/feature/deck'
import { DefaultLayout } from '@/components/feature/layout'

export default function DashboardPage() {
  return (
    <DefaultLayout title="Dashboard">
      <DeckTable />
    </DefaultLayout>
  )
}
