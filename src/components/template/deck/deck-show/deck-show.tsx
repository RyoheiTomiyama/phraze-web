import { DeckLayout, DeckQuiz, DeckQuizEmpty } from '@/components/feature/deck'
import { Heading } from '@/components/ui/heading'
import { useRouter } from 'next/router'
import { useDeckShowQuery } from './deck-show.generated'
import { useEffect } from 'react'
import { parseGQLError, ResponseError } from '@/lib/gql'
import { pagesPath } from '@/lib/pathpida/$path'

type DeckShowProps = {
  deckId?: number
}
export const DeckShow = ({ deckId }: DeckShowProps) => {
  const router = useRouter()

  const [{ data, fetching, error }] = useDeckShowQuery({
    pause: !deckId,
    requestPolicy: 'network-only',
    variables: {
      id: deckId || 0,
    },
  })

  useEffect(() => {
    if (error && !fetching && !data) {
      const err = parseGQLError(error)
      if (err instanceof ResponseError) {
        if (err.code === 404) {
          router.push(pagesPath.$404.$url(), router.asPath)
        }
      }
    }
  }, [data, error, fetching, router])

  if (!data) {
    return null
  }

  return (
    <DeckLayout>
      {/* <header className="container">
        <Heading variant="h1">{router.asPath.toUpperCase()}</Heading>
      </header> */}
      <main className="container flex flex-col flex-1 px-4">
        {data?.cards.pageInfo.totalCount === 0 && (
          <DeckQuizEmpty deckId={data.deck.id} />
        )}
        {data?.cards.pageInfo.totalCount > 0 && (
          <DeckQuiz cards={data.pendingCards.cards || []} deck={data.deck} />
        )}
      </main>
    </DeckLayout>
  )
}
