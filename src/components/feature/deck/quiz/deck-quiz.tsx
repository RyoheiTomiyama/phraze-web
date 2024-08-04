import { HTMLAttributes, useCallback, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  CardOnDeckQuizFragment,
  DeckOnDeckQuizFragment,
  useReviewCardOnDeckQuizMutation,
} from './deck-quiz.generated'
import { DeckQuizProgress } from './deck-quiz-progress'
import { QuizCard } from './quiz-card'
import { QuizAction } from './quiz-action'
import { parseGQLError } from '@/lib/gql'
import { toast } from 'sonner'
import { DeckQuizCompleted } from './deck-quiz-completed'

type DeckQuizProps = HTMLAttributes<HTMLDivElement> & {
  cards: CardOnDeckQuizFragment[]
  deck: DeckOnDeckQuizFragment
}

export const DeckQuiz = ({
  cards,
  deck,
  className,
  ...props
}: DeckQuizProps) => {
  const [current, setCurrent] = useState(0)
  const [show, setShow] = useState(false)
  const [, reviewCard] = useReviewCardOnDeckQuizMutation()

  const card = useMemo(() => {
    return cards[current]
  }, [cards, current])

  const handleShowAnswer = useCallback(() => {
    setShow(true)
  }, [])

  const handleResponse = useCallback(
    async (grade: number) => {
      if (card) {
        const { error } = await reviewCard({
          input: { cardId: card.id, grade },
        })

        if (error) {
          const e = parseGQLError(error)
          toast.error(e.message)
        }

        setCurrent((c) => {
          return c + 1
        })
        setShow(false)
      }
    },
    [card, reviewCard],
  )

  return (
    <div
      {...props}
      className={cn('flex-auto flex flex-col items-stretch', className)}
    >
      <div className="flex-auto flex flex-col gap-6 md:gap-10">
        <DeckQuizProgress
          totalCount={cards.length}
          count={Math.min(current + 1, cards.length)}
        />
        <div className="flex-auto flex flex-col gap-6 w-full max-w-screen-md mx-auto pb-6">
          {card ? (
            <>
              <QuizCard
                key={card.id}
                card={card}
                className="flex-auto"
                show={show}
              />
              <QuizAction
                className="absolute bottom-4 w-full max-w-md"
                show={show}
                onShowAnswer={handleShowAnswer}
                onResponse={handleResponse}
              />
            </>
          ) : (
            <DeckQuizCompleted deckId={deck.id} />
          )}
        </div>
      </div>
    </div>
  )
}
