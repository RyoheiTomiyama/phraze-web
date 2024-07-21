import { HTMLAttributes, useCallback, useState } from 'react'
import { DeckEmpty } from './deck-empty'
import { cn } from '@/lib/utils'
import {
  CardOnDeckQuizFragment,
  DeckOnDeckQuizFragment,
} from './deck-quiz.generated'
import { DeckQuizProgress } from './deck-quiz-progress'
import { QuizCard } from './quiz-card'
import { QuizAction } from './quiz-action'

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
  const [show, setShow] = useState(false)

  const handleShowAnswer = useCallback(() => {
    setShow(true)
  }, [])

  return (
    <div
      {...props}
      className={cn('flex-auto flex flex-col items-stretch', className)}
    >
      {cards.length > 0 && cards[0] ? (
        <div className="flex-auto flex flex-col gap-6 md:gap-10">
          <DeckQuizProgress totalCount={2} count={1} />
          <div className="flex-auto flex flex-col md:flex-row gap-6 md:gap-10 w-full max-w-screen-lg mx-auto">
            <QuizCard card={cards[0]} className="flex-auto" show={show} />
            <QuizAction show={show} onShowAnswer={handleShowAnswer} />
          </div>
        </div>
      ) : (
        <DeckEmpty deckId={deck.id} />
      )}
    </div>
  )
}
