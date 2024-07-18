import { z } from 'zod'

export const cardEditSchema = z.object({
  question: z.string().max(1000).default(''),
  answer: z.string().max(10000).default(''),
})
