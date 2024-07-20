import { AuthRequired } from '@/components/feature/auth'
import { DeckEdit } from '@/components/template/deck'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { z } from 'zod'

const paramSchema = z.object({
  id: z.coerce.number().default(0),
})

const querySchema = z.object({
  cardId: z.coerce.number().optional(),
})

export type OptionalQuery = z.output<typeof querySchema>

export default function DeckIdEditPage() {
  const router = useRouter()
  const { id } = useMemo(() => {
    return paramSchema.parse(router.query)
  }, [router.query])
  const query = querySchema.parse(router.query)

  return (
    <AuthRequired>
      <DeckEdit deckId={id} cardId={query.cardId} />
    </AuthRequired>
  )
}
