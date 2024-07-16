import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { PhraseInput } from './phrase-input'
import { DevTool } from '@/components/common/form'
import { CardOnCardEditFragment } from './card-edit.generated'

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
                <FormLabel>Phrase / Word</FormLabel>
                <FormDescription className="text-xs">
                  フレーズの中で覚えたい単語があれば太字にしてください
                </FormDescription>
                <FormControl>
                  <Input placeholder="覚えたいフレーズ・単語" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        {/* <Editor namespace="editor" /> */}
      </div>
      <DevTool control={form.control} />
    </Form>
  )
}
