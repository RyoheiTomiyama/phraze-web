import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PlusCircle } from 'lucide-react'
import { useCallback, useState } from 'react'
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
import { useCreateCardOnCardAddMutation } from './card-add.generated'
import { parseGQLError } from '@/lib/gql'
import { toast } from 'sonner'

type CardAddProps = {
  deckId: number
  disabled?: boolean
  onCreated?: (id: number) => void
}

export const CardAdd = ({
  deckId,
  disabled = false,
  onCreated,
}: CardAddProps) => {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [_, createCard] = useCreateCardOnCardAddMutation()

  const form = useForm(cardSchema, {
    defaultValues: {
      question: '',
    },
  })

  const handleSubmit = useCallback<SubmitHandler<CardSchemaOutput>>(
    async (data) => {
      setSubmitting(true)
      const { data: result, error } = await createCard({
        input: {
          deckId,
          question: data.question,
        },
      })
      setSubmitting(false)

      if (error) {
        const e = parseGQLError(error)
        toast.error(e.message)
      } else {
        setOpen(false)
        form.reset()
        toast.success('Card has been created')
      }

      setOpen(false)
      if (result?.createCard.card.id) {
        onCreated?.(result?.createCard.card.id)
      }
    },
    [createCard, deckId, form, onCreated],
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            disabled={disabled}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            Add Card
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <DialogHeader>
              <DialogTitle>Create New Card</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              覚えたいフレーズ・単語を入力してください。
              <br />
              フレーズの中で覚えたい単語があれば太字にすると、AIがより高い精度で回答を生成してくれます。
            </DialogDescription>
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => {
                return (
                  <FormItem>
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
            <DialogFooter>
              <Button type="submit" size="sm" disabled={submitting}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  )
}
