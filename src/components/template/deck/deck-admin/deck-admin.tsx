import { CardTable } from '@/components/feature/deck'
import { DefaultLayout } from '@/components/feature/layout'
import { useCardsOnDeckAdminQuery } from './deck-admin.generated'
import { useEffect } from 'react'
import { parseGQLError, ResponseError } from '@/lib/gql'
import { useRouter } from 'next/router'
import { pagesPath } from '@/lib/pathpida/$path'

type DeckAdminProps = {
  deckId: number
  limit: number
  offset: number
}

// contextが静的でないと、無限ループになる
// https://github.com/urql-graphql/urql/discussions/1132
const cardsContext = {
  // 空配列返してるときカード新規作成しても、このクエリがリフェッチしてくれない対策
  // https://commerce.nearform.com/open-source/urql/docs/basics/document-caching
  additionalTypenames: ['Card'],
}

export const DeckAdmin = ({ deckId, limit, offset }: DeckAdminProps) => {
  const router = useRouter()

  const [{ data, fetching, error }] = useCardsOnDeckAdminQuery({
    pause: !deckId,
    variables: {
      input: { where: { deckId }, limit, offset },
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
    <DefaultLayout title="Admin a deck">
      <CardTable
        cards={data?.cards.cards || []}
        deckId={deckId}
        pageInfo={{
          limit,
          offset,
          totalCount: data?.cards.pageInfo.totalCount || 0,
        }}
      />
    </DefaultLayout>
  )
}
