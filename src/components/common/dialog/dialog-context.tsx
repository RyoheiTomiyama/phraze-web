import { Dispatch, createContext, useContext } from 'react'
import { DialogId, DialogStore } from './dialog-state'
import { DialogAction } from './dialog-reducer'

export const context = createContext<DialogStore>({})
export const dispatchContext = createContext<Dispatch<DialogAction>>(() => {
  throw new Error('This is not yet initialized.')
})
export const dialogIdContext = createContext<DialogId | null>(null)

export const useDialogContext = () => {
  return useContext(context)
}

export const useDialogDispatchContext = () => {
  return useContext(dispatchContext)
}

export const useDialogIdContext = () => {
  return useContext(dialogIdContext)
}
