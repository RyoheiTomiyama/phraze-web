import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PhraseInput } from './phrase-input'
import { AnswerInput } from './answer-input'
import { cardEditSchema } from './card-edit-schema'
import { useFormContext } from '@/hook/useForm'
import { GenerateAnswerButton } from '@/components/feature/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Quantum } from '@/components/common/loader'

type CardEditProps = {
  cardId: number
  /** AIAnswer生成待ち */
  loadingAnswer?: boolean
}

export const CardEdit = ({ cardId, loadingAnswer = false }: CardEditProps) => {
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
              <div className="flex align-bottom justify-between gap-2">
                <div>
                  <FormLabel>Answer</FormLabel>
                  <FormDescription className="text-xs">
                    Phrase/Word に対する翻訳や解説
                  </FormDescription>
                </div>
                <div>
                  <GenerateAnswerButton
                    cardId={cardId}
                    question={form.watch('question') ?? ''}
                  />
                </div>
              </div>
              <div className="relative">
                <FormControl>
                  <AnswerInput
                    disabled={loadingAnswer || field.disabled}
                    onBlur={field.onBlur}
                    defaultValue={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                {loadingAnswer && (
                  <Skeleton className="absolute top-0 left-0 w-full h-full flex flex-col gap-4 items-center justify-center">
                    <Quantum />
                    <p className="text-sm">Generating Answer...</p>
                  </Skeleton>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )
        }}
      />
    </div>
  )
}
