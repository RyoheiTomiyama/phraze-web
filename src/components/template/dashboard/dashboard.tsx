import { DeckTable } from '@/components/feature/deck'
import { DefaultLayout } from '@/components/feature/layout'
import { useDecksOnDashboardQuery } from './dashboard.generated'

export const Dashboard = () => {
  const [{ data, fetching, error }] = useDecksOnDashboardQuery()
  return (
    <DefaultLayout title="Dashboard">
      <DeckTable decks={data?.decks.decks || []} />
    </DefaultLayout>
  )
}
