import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { PhraseInput } from './phrase-input'
import { DevTool } from '@/components/common/form'
import { CardOnCardEditFragment } from './card-edit.generated'
import { AnswerInput } from './answer-input'
import { clientEnv } from '@/lib/env'

type CardEditProps = {
  card: CardOnCardEditFragment
}

export const CardEdit = ({ card }: CardEditProps) => {
  const form = useForm({
    defaultValues: {
      question: card.question,
      answer: card.answer,
    },
  })

  return (
    <Form {...form}>
      <div className="flex flex-col gap-4 px-6 py-6">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Phrase / Word</FormLabel>
                <FormDescription className="text-xs">
                  フレーズの中で覚えたい単語があれば太字にしてください
                </FormDescription>
                <FormControl>
                  <PhraseInput
                    disabled={field.disabled}
                    onBlur={field.onBlur}
                    defaultValue={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Answer</FormLabel>
                <FormDescription className="text-xs">
                  Phrase/Word に対する翻訳や解説
                </FormDescription>
                <FormControl>
                  <AnswerInput
                    disabled={field.disabled}
                    onBlur={field.onBlur}
                    defaultValue={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
      </div>
      {clientEnv.NODE_ENV === 'development' && (
        <DevTool control={form.control} />
      )}
    </Form>
  )
}
