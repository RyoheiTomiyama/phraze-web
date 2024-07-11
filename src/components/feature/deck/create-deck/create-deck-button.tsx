import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { useForm } from '@/hook/useForm'
import { Plus } from 'lucide-react'
import { useCallback, useState } from 'react'
import { deckSchema, DeckSchemaOutput } from './schema'
import { CreateDeckDialog } from './create-deck-dialog'
import { useCreateDeckOnCreateDeckButtonMutation } from './create-deck-button.generated'
import { toast } from 'sonner'
import { parseGQLError } from '@/lib/gql'

export const CreateDeckButton = () => {
  const [open, setOpen] = useState(false)
  const [_, createDeck] = useCreateDeckOnCreateDeckButtonMutation()

  const form = useForm(deckSchema, {
    defaultValues: {
      name: '',
    },
  })

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        form.reset()
      }
      setOpen(open)
    },
    [form],
  )

  const handleCreate = useCallback(
    async (output: DeckSchemaOutput) => {
      const { data, error } = await createDeck({
        input: { name: output.name },
      })

      if (error) {
        const e = parseGQLError(error)
        toast.error(e.message)
      } else {
        setOpen(false)
        form.reset()
        toast.success('Deck has been created')
      }

      return { data, error }
    },
    [createDeck, form],
  )

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Form {...form}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="w-4" />
            新規作成
          </Button>
        </DialogTrigger>
        <CreateDeckDialog onSubmit={handleCreate} />
      </Form>
    </Dialog>
  )
}
