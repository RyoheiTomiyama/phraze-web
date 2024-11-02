import { Plus } from 'lucide-react'
import { useCallback, useRef } from 'react'
import { PhraseInput } from '../phrase-input'
import { useForm } from '@/hook/useForm'
import { CardSchemaOutput, cardSchema } from './schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { SubmitHandler } from 'react-hook-form'
import { useCreateCardOnCardCreateMutation } from './card-create.generated'
import { parseGQLError } from '@/lib/gql'
import { toast } from 'sonner'
import { LexicalEditor } from 'lexical'
import { clearEditor } from '@/lib/lexical'

type CardCreateProps = {
  deckId: number
  disabled?: boolean
  onCreated?: (id: number) => void
}

export const CardCreate = ({ deckId, onCreated }: CardCreateProps) => {
  const editorRef = useRef<LexicalEditor>(null)
  const [_, createCard] = useCreateCardOnCardCreateMutation()

  const form = useForm(cardSchema, {
    defaultValues: {
      question: '',
    },
  })

  const handleSubmit = useCallback<SubmitHandler<CardSchemaOutput>>(
    async (data) => {
      const { data: result, error } = await createCard({
        input: {
          deckId,
          question: data.question,
        },
      })

      if (error) {
        const e = parseGQLError(error)
        toast.error(e.message)
      } else {
        form.reset()
        clearEditor(editorRef.current)
        toast.success('Card has been created')
      }

      if (result?.createCard.card.id) {
        onCreated?.(result?.createCard.card.id)
      }
    },
    [createCard, deckId, form, onCreated],
  )

  const handleEnter = useCallback((event: KeyboardEvent | null) => {
    if (event?.target instanceof Element) {
      event.target
        .closest('form')
        ?.querySelector<HTMLElement>('button[type=submit], input[type=submit]')
        ?.click()
    }
  }, [])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => {
            return (
              <FormItem className="max-w-80">
                <FormControl>
                  <PhraseInput
                    disabled={field.disabled}
                    ref={editorRef}
                    onBlur={field.onBlur}
                    defaultValue={field.value}
                    onChange={field.onChange}
                    placeholder={
                      <div className="absolute pointer-events-none text-primary/40 flex flex-row items-center gap-1">
                        <Plus className="w-4 h-4" />
                        Add card
                      </div>
                    }
                    onEnter={handleEnter}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <div className="text-sm text-secondary-foreground">
          覚えたいフレーズ・単語を入力してください。
          <br />
          フレーズの中で覚えたい単語があれば太字にすると、AIがより高い精度で回答を生成してくれます。
        </div>
        <button type="submit" hidden>
          submit
        </button>
      </form>
    </Form>
  )
}
