import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  //   CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowRight, Plus } from 'lucide-react'
import Link from 'next/link'
import { CreateDeckButton } from './create-deck'

export const DeckTable = () => {
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
        <div className="flex items-center gap-4">
          <div className="grid gap-1 flex-1">
            <p className="text-sm font-medium leading-none">Olivia Martin</p>
            <p className="text-sm text-muted-foreground break-all">
              olivia.martin@email.com
            </p>
          </div>
          <div className="">
            <Button className="gap-2" asChild>
              <Link href="/deck/1">
                学習する
                <ArrowRight className="w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="grid gap-1 flex-1">
            <p className="text-sm font-medium leading-none">Olivia Martin</p>
            <p className="text-sm text-muted-foreground break-all">
              olivia.martin@email.com
            </p>
          </div>
          <div className="">
            <Button className="gap-2">
              学習する
              <ArrowRight className="w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
