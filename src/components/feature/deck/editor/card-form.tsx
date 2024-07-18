import { PropsWithChildren } from 'react'
import { CardOnCardEditFragment } from './card-edit.generated'
import { useForm } from '@/hook/useForm'
import { cardEditSchema } from './card-edit-schema'
import { Form } from '@/components/ui/form'
import { DevTool } from '@/components/common/form'

type CardFormProps = {
  card: CardOnCardEditFragment
}

export const CardForm = ({
  card,
  children,
}: PropsWithChildren<CardFormProps>) => {
  const form = useForm(cardEditSchema, {
    defaultValues: {
      question: card.question,
      answer: card.answer,
    },
  })

  return (
    <Form {...form}>
      {children}

      <DevTool control={form.control} />
    </Form>
  )
}
