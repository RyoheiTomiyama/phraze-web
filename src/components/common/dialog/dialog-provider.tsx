import { PropsWithChildren } from 'react'
import { DialogStore } from './dialog-state'
import { context, dispatchContext } from './dialog-context'
import { DialogContainer } from './dialog-container'
import { useDialogReducer } from './dialog-reducer'

export const DialogProvider = ({
  children,
  value = {},
}: PropsWithChildren<{ value?: DialogStore }>) => {
  const [store, dispatch] = useDialogReducer(value)
  return (
    <context.Provider value={store}>
      <dispatchContext.Provider value={dispatch}>
        {children}
        <DialogContainer store={store} />
      </dispatchContext.Provider>
    </context.Provider>
  )
}
