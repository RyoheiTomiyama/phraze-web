import { ComponentType, useReducer } from 'react'
import { DialogId, DialogStore } from './dialog-state'

export type DialogAction =
  | {
      type: 'show'
      payload: {
        id: DialogId
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Component: ComponentType<any>
        args?: Record<string, unknown>
      }
    }
  | {
      type: 'hide' | 'remove'
      payload: {
        id: DialogId
      }
    }

const reducer = (store: DialogStore, action: DialogAction): DialogStore => {
  switch (action.type) {
    case 'show': {
      const { id, Component, args = {} } = action.payload

      return {
        ...store,
        [id]: {
          ...store[id],
          id,
          Component,
          args,
          open: true,
        },
      }
    }
    case 'hide': {
      const { id } = action.payload
      if (!store[id]) {
        return store
      }

      return {
        ...store,
        [id]: {
          ...store[id],
          open: false,
        },
      }
    }
    case 'remove': {
      const { id } = action.payload
      const newStore = { ...store }
      delete newStore[id]

      return newStore
    }
    default: {
      return store
    }
  }
}

export const useDialogReducer = (initialValue: DialogStore) => {
  return useReducer(reducer, initialValue)
}
