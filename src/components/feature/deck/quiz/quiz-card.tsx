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
        'border border-primary rounded-sm shadow-sm max-w-3xl w-full px-4 py-6',
        'relative flex flex-col gap-6 bg-background',
        className,
      )}
    >
      <QuestionViewer value={card.question} />
      <Separator />
      <AnswerViewer value={card.answer || card.aiAnswer} show={show} />
      <span
        className="
        absolute top-0 inset-x-6 h-full
        border border-black border-opacity-10 rounded-sm shadow-sm -z-10
         bg-primary-foreground -translate-y-4
      "
      />
      <span
        className="
        absolute top-0 inset-x-4 h-full
        border border-black border-opacity-20 rounded-sm shadow-sm -z-10
         bg-primary-foreground -translate-y-3
      "
      />
      <span
        className="
        absolute top-0 inset-x-2 h-full
        border border-black border-opacity-30 rounded-sm shadow-sm -z-10
        bg-primary-foreground -translate-y-2
      "
      />
    </div>
  )
}
