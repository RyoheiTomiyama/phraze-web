import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Pencil } from 'lucide-react'
import Link from 'next/link'
import { UrlObject } from 'url'
import { formatDistanceToNow } from '@/lib/date-util/date-fns'

type Url = UrlObject | string

type DeckItemProps = {
  editLink: Url
  name: string
  pendingCount: number
  schduleAt?: Date
  startLink: Url
  totalCount: number
}

export const DeckItem = ({
  editLink,
  name,
  totalCount,
  schduleAt,
  startLink,
  pendingCount,
}: DeckItemProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle>{name}</CardTitle>
          <Button
            asChild
            size="xs"
            variant="ghost"
            className="w-6 h-6 p-0 text-muted-foreground"
          >
            <Link href={editLink}>
              <Pencil className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-4">
          <div className="flex-auto">
            <p className="text-sm text-muted-foreground mb-2">All</p>
            <p className="text-xl font-bold">{totalCount}</p>
          </div>
          <div className="flex-auto">
            <p className="text-sm text-muted-foreground mb-2">In progres</p>
            <p className="text-xl font-bold">{pendingCount}</p>
          </div>
          <div className="flex-auto">
            <p className="text-sm text-muted-foreground mb-2">Done</p>
            <p className="text-xl text-black font-bold text-opacity-25">
              {totalCount - pendingCount}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex-auto flex flex-row items-end justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            {schduleAt && (
              <>
                Next: <span>{formatDistanceToNow(schduleAt)}</span>
              </>
            )}
          </p>
          <Button asChild size="sm" className="rounded-full gap-1">
            <Link href={startLink}>
              Start Now
              <ArrowRight className="w-4" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
