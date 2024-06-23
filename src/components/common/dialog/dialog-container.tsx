import { Dialog } from '@/components/ui/dialog'
import { DialogStore } from './dialog-state'
import { dialogIdContext, useDialogDispatchContext } from './dialog-context'
import { useCallback } from 'react'

type DialogContainerProps = {
  store: DialogStore
}

export const DialogContainer = ({ store }: DialogContainerProps) => {
  const items = Object.entries(store)

  return (
    <>
      {items.map(([_, item]) => {
        return <DialogContainerItem key={item.id} {...item} />
      })}
    </>
  )
}

const DialogContainerItem = (item: DialogStore[string]) => {
  const dispatch = useDialogDispatchContext()
  const handleChange = useCallback(
    (open: boolean) => {
      if (!open) {
        dispatch({
          type: 'hide',
          payload: { id: item.id },
        })
      }
    },
    [dispatch, item.id],
  )

  return (
    <dialogIdContext.Provider key={item.id} value={item.id}>
      <Dialog open={item.open} onOpenChange={handleChange}>
        <item.Component {...item.args} />
      </Dialog>
    </dialogIdContext.Provider>
  )
}
