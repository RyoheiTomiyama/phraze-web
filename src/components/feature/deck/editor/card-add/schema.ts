import { z } from 'zod'

export const cardSchema = z.object({
  question: z.string().min(1).max(256),
})

export type CardSchemaInput = z.input<typeof cardSchema>
export type CardSchemaOutput = z.output<typeof cardSchema>
