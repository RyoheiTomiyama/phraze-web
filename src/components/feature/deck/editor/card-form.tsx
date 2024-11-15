import { PropsWithChildren } from 'react'
import { useForm } from '@/hook/useForm'
import { cardEditSchema } from './card-edit-schema'
import { Form } from '@/components/ui/form'
import { DevTool } from '@/components/common/form'
import { CardOnCardFormFragment } from './card-form.generated'

type CardFormProps = {
  card: CardOnCardFormFragment | undefined
}

export const CardForm = ({
  card,
  children,
}: PropsWithChildren<CardFormProps>) => {
  const form = useForm(cardEditSchema, {
    values: {
      question: card?.question,
      answer: card?.answer || card?.aiAnswer,
    },
  })

  return (
    <Form {...form}>
      {children}

      {/* FIXME 開発環境でerror https://github.com/react-hook-form/devtools/issues/208 */}
      <DevTool control={form.control} />
    </Form>
  )
}
