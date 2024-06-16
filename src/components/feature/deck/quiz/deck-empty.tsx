import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heading } from '@/components/ui/heading'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ComponentProps } from 'react'

type DeckEmptyProps = {
  deckId: number
} & ComponentProps<typeof Card>

export const DeckEmpty = ({ deckId, className, ...props }: DeckEmptyProps) => {
  return (
    <Card
      {...props}
      className={cn(
        'flex-1 flex flex-col items-center justify-center p-4 gap-1',
        className,
      )}
    >
      <Heading variant="h3" className="text-2xl font-bold tracking-tight">
        You have no cards
      </Heading>
      <p className="text-sm text-muted-foreground text-left inline-flex flex-col items-center">
        <span>まだカードが一つも登録されていません。</span>
        <span>学習カードを作成しましょう。</span>
      </p>
      <Button className="mt-4" asChild>
        <Link href={`/deck/${deckId}/card/new`}>Create Card</Link>
      </Button>
    </Card>
  )
}
