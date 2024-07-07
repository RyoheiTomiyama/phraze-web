import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  //   CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { CreateDeckButton } from './create-deck'
import { DeckOnDeckTableFragment } from './deck-table.generated'
import { cn } from '@/lib/utils'
import { pagesPath } from '@/lib/pathpida/$path'

type DeckTableProps = {
  decks: DeckOnDeckTableFragment[]
}
export const DeckTable = ({ decks }: DeckTableProps) => {
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader className="flex flex-row items-center">
        <div className="flex-1 grid gap-2">
          <CardTitle>Decks</CardTitle>
          {/* <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription> */}
        </div>
        <CreateDeckButton />
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {decks.map((d) => {
          return <CardItem key={d.id} deck={d} />
        })}
      </CardContent>
    </Card>
  )
}

const CardItem = ({
  deck,
  className,
}: {
  deck: DeckOnDeckTableFragment
  className?: string
}) => {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="grid gap-1 flex-1">
        <p className="text-sm font-medium leading-none">Olivia Martin</p>
        <p className="text-sm text-muted-foreground break-all">{deck.name}</p>
      </div>
      <div className="">
        <Button className="gap-2" asChild>
          <Link href={pagesPath.deck._id(deck.id).$url()}>
            学習する
            <ArrowRight className="w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
