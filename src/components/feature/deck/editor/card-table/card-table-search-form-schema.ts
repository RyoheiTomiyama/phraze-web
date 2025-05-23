import { z } from 'zod'

export const cardTableSearchFormSchema = z.object({
  q: z.string().max(256),
})

export type CardTableSearchFormSchemaInput = z.input<
  typeof cardTableSearchFormSchema
>
export type CardTableSearchFormSchemaOutput = z.output<
  typeof cardTableSearchFormSchema
>
