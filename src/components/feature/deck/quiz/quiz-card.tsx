import { cn } from '@/lib/utils'
import { CardOnQuizCardFragment } from './quiz-card.generated'
import { Separator } from '@/components/ui/separator'
import { AnswerViewer, QuestionViewer } from '@/components/feature/card'

type QuizCardProps = {
  card: CardOnQuizCardFragment
  className?: string
  show: boolean
}
export const QuizCard = ({ card, className, show }: QuizCardProps) => {
  return (
    <div
      className={cn(
        'border rounded-sm shadow-sm max-w-3xl w-full px-4 py-6',
        'relative flex flex-col gap-6 bg-primary-foreground',
        className,
      )}
    >
      <QuestionViewer value={card.question} />
      <Separator />
      <AnswerViewer value={card.answer} show={show} />
      <span
        className="
        absolute top-0 left-0 w-full h-full
        border rounded-sm shadow-sm -z-10
        rotate-2 bg-primary-foreground -translate-y-2 translate-x-2
      "
      />
      <span
        className="
        absolute top-0 left-0 w-full h-full
        border rounded-sm shadow-sm -z-10
        rotate-1 bg-primary-foreground -translate-y-1 translate-x-1
      "
      />
    </div>
  )
}
