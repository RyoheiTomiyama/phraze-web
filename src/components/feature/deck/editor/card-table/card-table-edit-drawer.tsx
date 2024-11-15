import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { useCallback, useMemo, useState } from 'react'
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
import { useFormContext } from '@/hook/useForm'
import { ConfirmDialog } from '@/components/common/dialog'

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
    <CardForm card={data?.card} key={data?.card.id}>
      <CardTableEditDrawerInner
        cardId={cardId}
        fetching={fetching}
        loadingAnswer={shouldPolling}
        open={open}
        onOpenChange={onOpenChange}
      />
    </CardForm>
  )
}

type CardTableEditDrawerInnerProps = {
  cardId: number | undefined
  fetching?: boolean
  loadingAnswer?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}
const CardTableEditDrawerInner = ({
  cardId,
  fetching,
  loadingAnswer,
  open,
  onOpenChange,
}: CardTableEditDrawerInnerProps) => {
  const { formState, reset } = useFormContext()
  const [openConfirm, setOpenConfirm] = useState(false)

  const handleOpenChange = useCallback(
    (op: boolean) => {
      if (op === false && op !== open && formState.isDirty) {
        setOpenConfirm(true)
      } else {
        onOpenChange?.(op)
      }
    },
    [formState.isDirty, onOpenChange, open],
  )

  const handleOk = useCallback(() => {
    setOpenConfirm(false)
    reset()
    onOpenChange?.(false)
  }, [onOpenChange, reset])

  const handleCancel = useCallback(() => {
    setOpenConfirm(false)
  }, [])

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent className="max-h-[90dvh]">
        {!fetching && !!cardId && (
          <div className="container overflow-auto">
            <CardEditAction
              cardId={cardId}
              onBack={() => {
                onOpenChange?.(false)
              }}
            />
            <ScrollArea className="h-full flex-auto">
              <CardEdit cardId={cardId} loadingAnswer={loadingAnswer} />
            </ScrollArea>
          </div>
        )}
      </DrawerContent>
      <ConfirmDialog
        open={openConfirm}
        title={'カード編集画面を閉じます'}
        description={'編集した内容が失われますが、よろしいですか？'}
        onCancel={handleCancel}
        onOk={handleOk}
      />
    </Drawer>
  )
}
