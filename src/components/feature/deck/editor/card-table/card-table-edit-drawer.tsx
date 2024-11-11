import { Drawer, DrawerContent } from '@/components/ui/drawer'
import React, { useMemo } from 'react'
import { CardForm } from '../card-form'
import { CardEditAction } from '../card-edit-action'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CardEdit } from '../card-edit'
import {
  CardOnCardTableEditDrawerFragment,
  useGetCardOnCardTableEditDrawerQuery,
} from './card-table-edit-drawer.generated'
import useSWR from 'swr'
import { add } from '@/lib/date-util'

type CardTableEditDrawerProps = {
  cardId: CardOnCardTableEditDrawerFragment['id'] | undefined
  open?: boolean
  onOpenChange?: (open: boolean) => void
}
export const CardTableEditDrawer = ({
  cardId,
  open,
  onOpenChange,
}: CardTableEditDrawerProps) => {
  const [{ data, fetching, error }, fetchGetCard] =
    useGetCardOnCardTableEditDrawerQuery({
      pause: true,
      requestPolicy: 'cache-and-network',
      variables: {
        id: cardId || 0,
      },
    })

  /** AI生成結果を取得するためにポーリングする
   * - AIAnswer持ってたら停止
   * - 作成から10秒以上経過していたら停止
   */
  const shouldPolling = useMemo(() => {
    if (!cardId) {
      return false
    }
    if (error) {
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
  }, [cardId, data, error])

  useSWR(
    shouldPolling
      ? ['DeckEditor', 'useGetCardOnDeckEditorQuery', cardId]
      : null,
    async () => {
      await fetchGetCard({ requestPolicy: 'network-only' })
    },
    { refreshInterval: 1000 },
  )
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="container">
          {!fetching && !!data?.card && cardId === data.card.id && (
            <CardForm card={data.card} key={data.card.id}>
              <CardEditAction
                cardId={data.card.id}
                onBack={() => {
                  onOpenChange?.(false)
                }}
              />
              <ScrollArea className="h-full flex-auto">
                <CardEdit cardId={data.card.id} loadingAnswer={shouldPolling} />
              </ScrollArea>
            </CardForm>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
