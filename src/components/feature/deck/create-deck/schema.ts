import { z } from 'zod'

export const deckSchema = z.object({
  name: z.string().min(1).max(256),
})

export type DeckSchemaInput = z.input<typeof deckSchema>
export type DeckSchemaOutput = z.output<typeof deckSchema>
