import { HTMLAttributes } from 'react'
import { DeckEmpty } from './deck-empty'
import { cn } from '@/lib/utils'
import {
  CardOnDeckQuizFragment,
  DeckOnDeckQuizFragment,
} from './deck-quiz.generated'
import { DeckQuizProgress } from './deck-quiz-progress'
import { QuizCard } from './quiz-card'

type DeckQuizProps = HTMLAttributes<HTMLDivElement> & {
  deck: DeckOnDeckQuizFragment
  cards: CardOnDeckQuizFragment[]
}

export const DeckQuiz = ({
  cards,
  className,
  deck,
  ...props
}: DeckQuizProps) => {
  return (
    <div
      {...props}
      className={cn('flex-auto flex flex-col items-stretch', className)}
    >
      {cards.length > 0 && cards[0] ? (
        <div className="flex-auto flex flex-col gap-6">
          <DeckQuizProgress totalCount={2} count={1} />
          <QuizCard card={cards[0]} className="flex-auto" />
        </div>
      ) : (
        <DeckEmpty deckId={deck.id} />
      )}
    </div>
  )
}
