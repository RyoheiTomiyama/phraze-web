import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Pencil } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export const DeckItemLoading = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between gap-2">
          <Skeleton className="w-full">
            <CardTitle className="">&nbsp;</CardTitle>
          </Skeleton>
          <Button
            size="xs"
            variant="ghost"
            className="w-6 h-6 p-0 text-muted-foreground"
            disabled
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-4">
          <div className="flex-auto">
            <p className="text-sm text-muted-foreground mb-2">All</p>
            <Skeleton>
              <p className="text-xl font-bold">&nbsp;</p>
            </Skeleton>
          </div>
          <div className="flex-auto">
            <p className="text-sm text-muted-foreground mb-2">In progres</p>
            <Skeleton>
              <p className="text-xl font-bold">&nbsp;</p>
            </Skeleton>
          </div>
          <div className="flex-auto">
            <p className="text-sm text-muted-foreground mb-2">Done</p>
            <Skeleton>
              <p className="text-xl text-black font-bold text-opacity-25">
                &nbsp;
              </p>
            </Skeleton>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex-auto flex flex-row items-end justify-between gap-4">
          <p className="text-xs text-muted-foreground"></p>
          <Button size="sm" className="rounded-full gap-1" disabled>
            Start Now
            <ArrowRight className="w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
