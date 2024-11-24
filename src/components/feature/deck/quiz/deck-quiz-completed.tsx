import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { DeckOnDeckQuizCompletedFragment } from './deck-quiz-completed.generated'
import { pagesPath } from '@/lib/pathpida/$path'

type DeckQuizCompletedProps = {
  deckId: DeckOnDeckQuizCompletedFragment['id']
} & React.HTMLAttributes<HTMLDivElement>

export const DeckQuizCompleted = ({
  deckId,
  className,
  ...props
}: DeckQuizCompletedProps) => {
  return (
    <div
      {...props}
      className={cn(
        'flex-1 flex flex-col items-center justify-center p-4 gap-4',
        className,
      )}
    >
      <Heading variant="h3" className="text-2xl font-bold tracking-tight">
        All cards are already completed!
      </Heading>
      <p className="text-sm text-muted-foreground text-left inline-flex flex-col items-center">
        <span>お疲れ様です！</span>
        <span>すべてのカードを学習しました。</span>
      </p>
      <div className="flex flex-col gap-2">
        <Button className="mt-4" asChild>
          <Link href={pagesPath.dashboard.$url()}>Back to Dashboard</Link>
        </Button>
        <Button className="mt-2 text-muted-foreground" asChild variant="link">
          <Link href={pagesPath.deck._id(deckId).admin.$url()}>Edit Deck</Link>
        </Button>
      </div>
    </div>
  )
}
