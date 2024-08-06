import { Ai } from '@/components/common/icon'
import { Button } from '@/components/ui/button'

type GenerateAnswerButtonProps = {
  cardId: number
  disabled?: boolean
}

export const GenerateAnswerButton = ({
  cardId,
  disabled = false,
}: GenerateAnswerButtonProps) => {
  return (
    <Button variant="ghost" size="icon" disabled={disabled}>
      <Ai className="h-5 w-5" />
    </Button>
  )
}
