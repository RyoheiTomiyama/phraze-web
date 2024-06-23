import { Dialog } from '@/components/ui/dialog'
import { DialogStore } from './dialog-state'

type DialogContainerProps = {
  store: DialogStore
}

export const DialogContainer = ({ store }: DialogContainerProps) => {
  const items = Object.entries(store)

  return (
    <>
      {items.map(([_, item]) => {
        return (
          <Dialog key={item.id} open={item.open}>
            <item.Component {...item.args} />
          </Dialog>
        )
      })}
    </>
  )
}
