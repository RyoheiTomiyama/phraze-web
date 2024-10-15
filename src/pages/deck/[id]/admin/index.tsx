import { AuthRequired } from '@/components/feature/auth'
import { DeckAdmin } from '@/components/template/deck'
import { useRouter } from 'next/router'
import { z } from 'zod'

const paramSchema = z.object({
  id: z.coerce.number().default(0),
})

export default function DeckIdAdminPage() {
  const router = useRouter()
  const { id } = paramSchema.parse(router.query)

  return (
    <AuthRequired>
      <DeckAdmin deckId={id} />
    </AuthRequired>
  )
}
