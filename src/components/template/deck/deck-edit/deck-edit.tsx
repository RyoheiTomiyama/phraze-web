// import { CardTable } from '@/components/feature/card'
import { DeckEditor } from '@/components/feature/deck'
import { DefaultLayout } from '@/components/feature/layout'
import { useRouter } from 'next/router'
import { useCardsOnDeckEditQuery } from './deck-edit.generated'
import { useEffect } from 'react'
import { parseGQLError, ResponseError } from '@/lib/gql'
import { pagesPath } from '@/lib/pathpida/$path'

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
      title={router.asPath.toUpperCase()}
      // mainProps={{ className: 'max-h-dvh' }}
    >
      <DeckEditor
        className="flex-auto"
        cards={data?.cards.cards || []}
        loading={fetching}
      />
      {/* <CardTable /> */}
    </DefaultLayout>
  )
}
