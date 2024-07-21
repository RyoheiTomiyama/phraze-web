import { HTMLAttributes } from 'react'
import { DeckEmpty } from './deck-empty'
import { cn } from '@/lib/utils'
import { DeckOnDeckQuizFragment } from './deck-quiz.generated'

type DeckQuizProps = HTMLAttributes<HTMLDivElement> & {
  deck: DeckOnDeckQuizFragment
}

export const DeckQuiz = ({ className, deck, ...props }: DeckQuizProps) => {
  return (
    <div
      {...props}
      className={cn('flex-1 flex flex-col items-stretch', className)}
    >
      <DeckEmpty deckId={deck.id} />
    </div>
  )
}
