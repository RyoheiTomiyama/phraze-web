import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { DeckOnDeckListFragment } from './deck-list.generated'
import { Button } from '@/components/ui/button'
import { ArrowRight, Pencil } from 'lucide-react'
import Link from 'next/link'
import { pagesPath } from '@/lib/pathpida/$path'

type DeckItemProps = {
  item: DeckOnDeckListFragment
}

export const DeckItem = ({ item }: DeckItemProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle>{item.name}</CardTitle>
          <Button
            asChild
            size="xs"
            variant="ghost"
            className="w-6 h-6 p-0 text-muted-foreground"
          >
            <Link href={pagesPath.deck._id(item.id).edit.$url()}>
              <Pencil className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-4">
          <div className="flex-auto">
            <p className="text-sm text-muted-foreground mb-2">All</p>
            <p className="text-xl font-bold">32</p>
          </div>
          <div className="flex-auto">
            <p className="text-sm text-muted-foreground mb-2">In progres</p>
            <p className="text-xl font-bold">10</p>
          </div>
          <div className="flex-auto">
            <p className="text-sm text-muted-foreground mb-2">Done</p>
            <p className="text-xl text-black font-bold text-opacity-25">22</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex-auto flex flex-row items-end justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Next: <span>2024-04-01 12:00</span>
          </p>
          <Button asChild size="sm" className="rounded-full gap-1">
            <Link href={pagesPath.deck._id(item.id).$url()}>
              Start Now
              <ArrowRight className="w-4" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
