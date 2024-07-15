import { DeckTable } from '@/components/feature/deck'
import { DefaultLayout } from '@/components/feature/layout'
import { useDecksOnDashboardQuery } from './dashboard.generated'
import { DeckList } from '@/components/feature/deck/deck-list'

export const Dashboard = () => {
  const [{ data, fetching, error }] = useDecksOnDashboardQuery()
  return (
    <DefaultLayout title="Dashboard">
      <DeckList decks={data?.decks.decks || []} />
      <DeckTable decks={data?.decks.decks || []} />
    </DefaultLayout>
  )
}
