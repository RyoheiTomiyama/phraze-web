import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { useForm } from '@/hook/useForm'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { deckSchema } from './schema'
import { CreateDeckDialog } from './create-deck-dialog'

export const CreateDeckButton = () => {
  const [open, setOpen] = useState(false)

  const form = useForm(deckSchema, {
    defaultValues: {
      name: '',
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="w-4" />
            新規作成
          </Button>
        </DialogTrigger>
        <CreateDeckDialog />
      </Form>
    </Dialog>
  )
}
