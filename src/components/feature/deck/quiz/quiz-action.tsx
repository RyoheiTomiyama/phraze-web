import { Button } from '@/components/ui/button'
import { Frown, Laugh } from 'lucide-react'

type QuizActionProps = {
  show: boolean
  onShowAnswer?: () => void
  onResponse?: () => void
}

export const QuizAction = ({ show, onShowAnswer }: QuizActionProps) => {
  if (!show) {
    return (
      <div className="min-w-32 md:pt-10">
        <Button className="rounded-full w-full max-w-36" onClick={onShowAnswer}>
          Show Answer
        </Button>
      </div>
    )
  }

  return (
    <div className="flex-auto flex flex-row-reverse md:flex-col justify-between md:justify-normal gap-4 md:gap-6 min-w-32 md:pt-10">
      <Button
        className="rounded-full w-full max-w-36 gap-2 md:justify-start md:px-6"
        onClick={onShowAnswer}
      >
        <Laugh className="w-5" />
        Easy
      </Button>
      <Button
        variant="secondary"
        className="rounded-full w-full max-w-36 border border-primary gap-2 md:justify-start md:px-6"
        onClick={onShowAnswer}
      >
        <Frown className="w-5" />
        Again
      </Button>
    </div>
  )
}
