import { z } from 'zod'

export const cardSchema = z.object({
  question: z.string().min(1).max(256),
})
