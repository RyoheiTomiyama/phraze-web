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
import { useCallback, useEffect, useMemo } from 'react'
import { logger } from '@/lib/logger'
import { CardForm } from './card-form'
import { CardEditAction } from './card-edit-action'
import { useRouter } from 'next/router'
import { pagesPath } from '@/lib/pathpida/$path'
import useSWR from 'swr'
import { add } from '@/lib/date-util'
import { CardList } from './card-list'

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

  const [{ data, fetching, error }, fetchGetCard] = useGetCardOnDeckEditorQuery(
    {
      pause: true,
      requestPolicy: 'cache-and-network',
      variables: {
        id: cardId || 0,
      },
    },
  )

  /** AI生成結果を取得するためにポーリングする
   * - AIAnswer持ってたら停止
   * - 作成から10秒以上経過していたら停止
   */
  const shouldPolling = useMemo(() => {
    if (!cardId) {
      return false
    }
    if (!data) {
      return true
    }
    if (data.card.id !== cardId) {
      return true
    }
    if (data.card.aiAnswer.length) {
      return false
    }
    return new Date(data?.card.createdAt) > add(new Date(), { seconds: -10 })
  }, [cardId, data])

  useSWR(
    shouldPolling
      ? ['DeckEditor', 'useGetCardOnDeckEditorQuery', cardId]
      : null,
    async () => {
      await fetchGetCard({ requestPolicy: 'network-only' })
    },
    { refreshInterval: 1000 },
  )

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
      router.push(
        pagesPath.deck._id(deckId).edit.$url({ query: { cardId: id } }),
      )
    },
    [deckId, router],
  )

  const handleGoEditTop = useCallback(() => {
    router.push(pagesPath.deck._id(deckId).edit.$url())
  }, [deckId, router])

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className={cn('rounded-lg border bg-card', className)}
    >
      <ResizablePanel
        defaultSize={30}
        minSize={10}
        data-selected={!!cardId}
        className="data-[selected=true]:hidden data-[selected=true]:sm:flex"
      >
        <Card className="flex flex-col border-none h-full w-full">
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
                <CardList
                  activeCardId={cardId}
                  cards={cards}
                  onClick={handleSelectCard}
                />
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
        className="flex flex-col data-[selected=false]:hidden data-[selected=false]:sm:flex"
        data-selected={!!cardId}
      >
        {!fetching && !!data?.card && (
          <CardForm card={data.card} key={data.card.id}>
            <CardEditAction cardId={data.card.id} onBack={handleGoEditTop} />
            <ScrollArea className="h-full flex-auto">
              <CardEdit cardId={data.card.id} loadingAnswer={shouldPolling} />
            </ScrollArea>
          </CardForm>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
