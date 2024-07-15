// import { CardTable } from '@/components/feature/card'
import { DeckEditor } from '@/components/feature/deck'
import { DefaultLayout } from '@/components/feature/layout'
import { useRouter } from 'next/router'
import { useCardsOnDeckEditQuery } from './deck-edit.generated'

type DeckEditProps = {
  deckId: number
}
export const DeckEdit = ({ deckId }: DeckEditProps) => {
  const router = useRouter()

  const [{ data, fetching, error }] = useCardsOnDeckEditQuery({
    pause: !deckId,
    variables: {
      input: { where: { deckId } },
    },
  })

  return (
    <DefaultLayout
      className="max-h-dvh"
      title={router.asPath.toUpperCase()}
      // mainProps={{ className: 'max-h-dvh' }}
    >
      <DeckEditor className="flex-auto" cards={data?.cards.cards || []} />
      {/* <CardTable /> */}
    </DefaultLayout>
  )
}
