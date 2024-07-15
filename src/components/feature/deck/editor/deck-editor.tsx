import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { CardEdit } from './card-edit'
import { CardAdd } from './card-add'
import { CardOnDeckEditorFragment } from './deck-editor.generated'

type DeckEditorProps = {
  className?: string
  cards: CardOnDeckEditorFragment[]
}

export const DeckEditor = ({ cards, className }: DeckEditorProps) => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className={cn('rounded-lg border bg-white', className)}
    >
      <ResizablePanel defaultSize={30} minSize={10}>
        <Card className="flex flex-col border-none h-full">
          <CardHeader>
            <CardTitle>Cards</CardTitle>
          </CardHeader>
          <CardContent className="flex-auto overflow-hidden pb-0">
            <ScrollArea className="-mx-6 h-full">
              <div>
                {cards.map((card) => {
                  return (
                    <div
                      key={card.id}
                      className="px-6 py-2 cursor-pointer hover:bg-muted"
                    >
                      <span className=" line-clamp-1 text-muted-foreground">
                        {card.question}
                      </span>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t flex justify-center py-4">
            <CardAdd />
          </CardFooter>
        </Card>
      </ResizablePanel>
      <ResizableHandle className="hidden sm:flex" />
      <ResizablePanel defaultSize={70} minSize={50} className="hidden sm:block">
        <CardEdit />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
