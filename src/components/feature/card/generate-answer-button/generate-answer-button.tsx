import { Ai } from '@/components/common/icon'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from './confirm-dialog'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { useCallback, useState } from 'react'

type GenerateAnswerButtonProps = {
  cardId: number
  disabled?: boolean
}

export const GenerateAnswerButton = ({
  cardId,
  disabled = false,
}: GenerateAnswerButtonProps) => {
  const [open, setOpen] = useState(false)

  const handleSubmit = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" disabled={disabled}>
          <Ai className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <ConfirmDialog onSubmit={handleSubmit} />
    </Dialog>
  )
}
