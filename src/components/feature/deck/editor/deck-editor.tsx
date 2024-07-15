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
import { Loader2 } from 'lucide-react'
import { TooltipGuide, useTooltipGuide } from '@/components/common/tooltip'
import { useEffect } from 'react'

type DeckEditorProps = {
  className?: string
  cards: CardOnDeckEditorFragment[]
  loading?: boolean
}

export const DeckEditor = ({
  cards,
  className,
  loading = false,
}: DeckEditorProps) => {
  const { open, setOpen, elemetRef } = useTooltipGuide<HTMLSpanElement>({})

  useEffect(() => {
    if (!loading) {
      setOpen(!cards.length)
    }
  }, [cards.length, loading, setOpen])

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
            {loading ? (
              <div className="p-4 flex flex-col items-center">
                <Loader2 className="w-4 animate-spin" />
              </div>
            ) : (
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
                  {!cards.length && (
                    <p className="px-6 text-xs">
                      カードが一つも登録されていません。
                      <br />
                      学習カードを作成しましょう。
                    </p>
                  )}
                </div>
              </ScrollArea>
            )}
          </CardContent>
          <CardFooter className={cn('border-t flex justify-center py-4')}>
            <TooltipGuide
              elementRef={elemetRef.current}
              open={open}
              onClose={() => {
                return setOpen(false)
              }}
            >
              学習したフレーズ・単語を登録しましょう
            </TooltipGuide>
            <span ref={elemetRef}>
              <CardAdd disabled={loading} />
            </span>
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
