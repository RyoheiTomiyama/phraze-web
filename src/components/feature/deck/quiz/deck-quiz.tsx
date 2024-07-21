import { HTMLAttributes } from 'react'
import { DeckEmpty } from './deck-empty'
import { cn } from '@/lib/utils'
import {
  CardOnDeckQuizFragment,
  DeckOnDeckQuizFragment,
} from './deck-quiz.generated'
import { DeckQuizProgress } from './deck-quiz-progress'

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
      className={cn('flex-1 flex flex-col items-stretch', className)}
    >
      {cards.length > 0 ? (
        <DeckQuizProgress totalCount={2} count={1} />
      ) : (
        <DeckEmpty deckId={deck.id} />
      )}
    </div>
  )
}
