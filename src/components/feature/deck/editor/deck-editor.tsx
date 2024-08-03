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
import {
  CardOnDeckEditorFragment,
  useGetCardOnDeckEditorQuery,
} from './deck-editor.generated'
import { Loader2 } from 'lucide-react'
import { TooltipGuide, useTooltipGuide } from '@/components/common/tooltip'
import { useCallback, useEffect } from 'react'
import { logger } from '@/lib/logger'
import { CardForm } from './card-form'
import { CardEditAction } from './card-edit-action'
import { useRouter } from 'next/router'
import { pagesPath } from '@/lib/pathpida/$path'

type DeckEditorProps = {
  className?: string
  cards: CardOnDeckEditorFragment[]
  cardId?: number
  deckId: number
  loading?: boolean
}

export const DeckEditor = ({
  cards,
  cardId,
  className,
  deckId,
  loading = false,
}: DeckEditorProps) => {
  const router = useRouter()
  const { open, setOpen, elemetRef } = useTooltipGuide<HTMLSpanElement>({})

  const [{ data, fetching, error }] = useGetCardOnDeckEditorQuery({
    pause: !cardId,
    requestPolicy: 'cache-and-network',
    variables: {
      id: cardId || 0,
    },
  })

  useEffect(() => {
    if (error) {
      logger.error(error)
    }
  }, [error])

  useEffect(() => {
    if (!loading) {
      setOpen(!cards.length)
    }
  }, [cards.length, loading, setOpen])

  const handleSelectCard = useCallback(
    (id: number) => {
      return () => {
        router.push(
          pagesPath.deck._id(deckId).edit.$url({ query: { cardId: id } }),
        )
      }
    },
    [deckId, router],
  )

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
                        data-active={card.id === cardId}
                        className="px-6 py-2 cursor-pointer hover:bg-muted data-[active='true']:font-bold"
                        onClick={handleSelectCard(card.id)}
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
              <CardAdd deckId={deckId} disabled={loading} />
            </span>
          </CardFooter>
        </Card>
      </ResizablePanel>
      <ResizableHandle className="hidden sm:flex" />
      <ResizablePanel
        defaultSize={70}
        minSize={50}
        className="hidden sm:flex flex-col"
      >
        {!fetching && !!data?.card && (
          <CardForm card={data.card} key={data.card.id}>
            <CardEditAction cardId={data.card.id} />
            <ScrollArea className="h-full flex-auto">
              <CardEdit />
            </ScrollArea>
          </CardForm>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
