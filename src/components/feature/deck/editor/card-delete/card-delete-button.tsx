import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Trash2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useDeleteCardOnCardDeleteButtonMutation } from './card-delete-button.generated'
import { DeleteCardConfirmDialog } from '@/components/feature/card'
import { parseGQLError } from '@/lib/gql'
import { toast } from 'sonner'

type CardDeleteButtonProps = {
  cardId: number
  onBack?: () => void
}
export const CardDeleteButton = ({ cardId, onBack }: CardDeleteButtonProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [, deleteCard] = useDeleteCardOnCardDeleteButtonMutation()

  const handleSubmit = useCallback(async () => {
    setLoading(true)
    const { error } = await deleteCard(
      {
        input: {
          id: cardId,
        },
      },
      { additionalTypenames: ['Card'] },
    )

    if (error) {
      const e = parseGQLError(error)
      toast.error(e.message)
      setLoading(false)
    } else {
      setLoading(false)
      setOpen(false)
      toast.success('Card has been deleted')
    }

    onBack?.()
  }, [cardId, deleteCard, onBack])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="group w-9 h-9">
          <Trash2 className="w-4 h-4 text-secondary-foreground group-hover:text-destructive" />
        </Button>
      </DialogTrigger>
      <DeleteCardConfirmDialog loading={loading} onSubmit={handleSubmit} />
    </Dialog>
  )
}
