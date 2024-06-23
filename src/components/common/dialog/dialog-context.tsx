import { Dispatch, PropsWithChildren, createContext, useContext } from 'react'
import { DialogStore } from './dialog-state'
import { DialogAction, useDialogReducer } from './dialog-reducer'
import { DialogContainer } from './dialog-container'

const context = createContext<DialogStore>({})
const dispatchContext = createContext<Dispatch<DialogAction>>(() => {
  throw new Error('This is not yet initialized.')
})

export const useDialogContext = () => {
  return useContext(context)
}

export const useDialogDispatchContext = () => {
  return useContext(dispatchContext)
}

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
