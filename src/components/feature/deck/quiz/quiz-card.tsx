import { cn } from '@/lib/utils'
import { CardOnQuizCardFragment } from './quiz-card.generated'
import { Separator } from '@/components/ui/separator'
import { AnswerViewer, QuestionViewer } from '@/components/feature/card'

type QuizCardProps = {
  card: CardOnQuizCardFragment
  className?: string
}
export const QuizCard = ({ card, className }: QuizCardProps) => {
  return (
    <div
      className={cn(
        'border shadow-sm max-w-3xl w-full px-4 py-6',
        'flex flex-col gap-6',
        className,
      )}
    >
      <QuestionViewer value={card.question} />
      <Separator />
      <AnswerViewer value={card.answer} />
    </div>
  )
}
