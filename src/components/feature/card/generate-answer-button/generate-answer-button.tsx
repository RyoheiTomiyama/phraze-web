import { Ai } from '@/components/common/icon'
import { Button } from '@/components/ui/button'
import { ConfirmDialog } from './confirm-dialog'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { useCallback, useState } from 'react'
import { useUpdateCardWithGenAnswerOnGenerateAnswerButtonMutation } from './generate-answer-button.generated'

type GenerateAnswerButtonProps = {
  cardId: number
  disabled?: boolean
  question: string
}

export const GenerateAnswerButton = ({
  cardId,
  disabled = false,
  question,
}: GenerateAnswerButtonProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [, updateCard] =
    useUpdateCardWithGenAnswerOnGenerateAnswerButtonMutation()

  const handleSubmit = useCallback(async () => {
    setLoading(true)
    await updateCard({
      input: {
        id: cardId,
        question,
      },
    })
    setLoading(false)
    setOpen(false)
  }, [cardId, question, updateCard])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" disabled={disabled}>
          <Ai className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <ConfirmDialog onSubmit={handleSubmit} loading={loading} />
    </Dialog>
  )
}
