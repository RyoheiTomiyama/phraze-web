import { CardTable } from '@/components/feature/deck'
import { DefaultLayout } from '@/components/feature/layout'

type DeckAdminProps = {
  deckId: number
}

export const DeckAdmin = ({ deckId }: DeckAdminProps) => {
  return (
    <DefaultLayout className="max-h-dvh" title="Admin a deck">
      <CardTable />
    </DefaultLayout>
  )
}
