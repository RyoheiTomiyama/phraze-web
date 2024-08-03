import { DefaultLayout } from '@/components/feature/layout'
import { useDecksOnDashboardQuery } from './dashboard.generated'
import { DeckList } from '@/components/feature/deck/deck-list'

export const Dashboard = () => {
  const [{ data, fetching, error }] = useDecksOnDashboardQuery({
    requestPolicy: 'cache-and-network',
  })
  return (
    <DefaultLayout title="Dashboard">
      <DeckList decks={data?.decks.decks || []} />
    </DefaultLayout>
  )
}
