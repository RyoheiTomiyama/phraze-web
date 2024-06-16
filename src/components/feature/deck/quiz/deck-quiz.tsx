import { HTMLAttributes } from 'react'
import { DeckEmpty } from './deck-empty'
import { cn } from '@/lib/utils'

type DeckQuizProps = HTMLAttributes<HTMLDivElement>

export const DeckQuiz = ({ className, ...props }: DeckQuizProps) => {
  return (
    <div
      {...props}
      className={cn('flex-1 flex flex-col items-stretch', className)}
    >
      <DeckEmpty deckId={3} />
    </div>
  )
}
