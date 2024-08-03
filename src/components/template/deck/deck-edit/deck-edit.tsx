// import { CardTable } from '@/components/feature/card'
import { DeckEditor } from '@/components/feature/deck'
import { DefaultLayout } from '@/components/feature/layout'
import { useRouter } from 'next/router'
import { useCardsOnDeckEditQuery } from './deck-edit.generated'
import { useEffect } from 'react'
import { parseGQLError, ResponseError } from '@/lib/gql'
import { pagesPath } from '@/lib/pathpida/$path'

type DeckEditProps = {
  cardId?: number
  deckId: number
}

// contextが静的でないと、無限ループになる
// https://github.com/urql-graphql/urql/discussions/1132
const cardsContext = {
  // 空配列返してるときカード新規作成しても、このクエリがリフェッチしてくれない対策
  // https://commerce.nearform.com/open-source/urql/docs/basics/document-caching
  additionalTypenames: ['Card'],
}

export const DeckEdit = ({ cardId, deckId }: DeckEditProps) => {
  const router = useRouter()

  const [{ data, fetching, error }] = useCardsOnDeckEditQuery({
    pause: !deckId,
    variables: {
      input: { where: { deckId } },
    },
    context: cardsContext,
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

  return (
    <DefaultLayout
      className="max-h-dvh"
      title="Edit a deck"
      // mainProps={{ className: 'max-h-dvh' }}
    >
      <DeckEditor
        className="flex-auto"
        cards={data?.cards.cards || []}
        cardId={cardId}
        deckId={deckId}
        loading={fetching}
      />
      {/* <CardTable /> */}
    </DefaultLayout>
  )
}
