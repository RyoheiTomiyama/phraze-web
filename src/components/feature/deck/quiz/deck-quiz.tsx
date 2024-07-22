import { HTMLAttributes, useCallback, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { CardOnDeckQuizFragment } from './deck-quiz.generated'
import { DeckQuizProgress } from './deck-quiz-progress'
import { QuizCard } from './quiz-card'
import { QuizAction } from './quiz-action'

type DeckQuizProps = HTMLAttributes<HTMLDivElement> & {
  cards: CardOnDeckQuizFragment[]
}

export const DeckQuiz = ({ cards, className, ...props }: DeckQuizProps) => {
  const [current, setCurrent] = useState(0)
  const [show, setShow] = useState(false)

  const card = useMemo(() => {
    return cards[current]
  }, [cards, current])

  const handleShowAnswer = useCallback(() => {
    setShow(true)
  }, [])

  const handleResponse = useCallback(() => {
    if (current < cards.length - 1) {
      setCurrent((c) => {
        return c + 1
      })
      setShow(false)
    }
  }, [cards.length, current])

  return (
    <div
      {...props}
      className={cn('flex-auto flex flex-col items-stretch', className)}
    >
      <div className="flex-auto flex flex-col gap-6 md:gap-10">
        <DeckQuizProgress totalCount={cards.length} count={current + 1} />
        <div className="flex-auto flex flex-col md:flex-row gap-6 md:gap-10 w-full max-w-screen-lg mx-auto">
          {card ? (
            <>
              <QuizCard
                key={card.id}
                card={card}
                className="flex-auto"
                show={show}
              />
              <QuizAction
                show={show}
                onShowAnswer={handleShowAnswer}
                onResponse={handleResponse}
              />
            </>
          ) : (
            'already completed'
          )}
        </div>
      </div>
    </div>
  )
}
