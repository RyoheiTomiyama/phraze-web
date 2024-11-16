import { AuthRequired } from '@/components/feature/auth'
import { DeckAdmin } from '@/components/template/deck'
import { useRouter } from 'next/router'
import { z } from 'zod'

export type OptionalQuery = {
  limit?: number
  offset?: number
}

const paramSchema = z.object({
  id: z.coerce.number().default(0),
  limit: z.coerce.number().default(20),
  offset: z.coerce.number().default(0),
})

export default function DeckIdAdminPage() {
  const router = useRouter()
  const { id, limit, offset } = paramSchema.parse(router.query)

  return (
    <AuthRequired>
      <DeckAdmin deckId={id} limit={limit} offset={offset} />
    </AuthRequired>
  )
}
