import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PhraseInput } from './phrase-input'
import { DevTool } from '@/components/common/form'
import { AnswerInput } from './answer-input'
import { cardEditSchema } from './card-edit-schema'
import { useFormContext } from '@/hook/useForm/useForm'

export const CardEdit = () => {
  const form = useFormContext<typeof cardEditSchema>()

  return (
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
  )
}
