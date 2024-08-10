import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Heading } from '@/components/ui/heading'
import { CreateDeckButton } from '../create-deck'

export const ItemAdd = () => {
  return (
    <Card className="border-dashed flex flex-col items-center justify-center">
      <CardHeader>
        <Heading variant="h3" className="text-2xl font-bold tracking-tight">
          Add new deck
        </Heading>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-3">
        <p className="text-sm text-muted-foreground text-left inline-flex flex-col items-center">
          <span>単語やフレーズなど、ジャンルごとのデッキを作成できます。</span>
        </p>
        <CreateDeckButton />
      </CardContent>
    </Card>
  )
}
