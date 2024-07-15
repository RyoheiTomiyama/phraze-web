import { DeckEdit } from '@/components/template/deck'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { z } from 'zod'

export type Query = {
  id: number
}

const querySchema = z.object({
  id: z.coerce.number().default(0),
})

export default function DeckIdEditPage() {
  const router = useRouter()
  const { id } = useMemo(() => {
    return querySchema.parse(router.query)
  }, [router.query])

  return <DeckEdit deckId={id} />
}
