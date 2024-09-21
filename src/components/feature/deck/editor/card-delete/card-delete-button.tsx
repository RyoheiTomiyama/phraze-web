import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Trash2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import { ConfirmDialog } from './confirm-dialog'
import { useDeleteCardOnCardDeleteButtonMutation } from './card-delete-button.generated'

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
    await deleteCard(
      {
        input: {
          id: cardId,
        },
      },
      { additionalTypenames: ['Card'] },
    )
    setLoading(false)
    setOpen(false)

    onBack?.()
  }, [cardId, deleteCard, onBack])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Trash2 className="w-5 h-5 text-secondary-foreground hover:text-destructive" />
        </Button>
      </DialogTrigger>
      <ConfirmDialog loading={loading} onSubmit={handleSubmit} />
    </Dialog>
  )
}
