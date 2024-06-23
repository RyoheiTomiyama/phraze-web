import { useReducer } from 'react'
import { DialogId, DialogStore } from './dialog-state'

export type DialogAction = {
  type: 'show' | 'hide' | 'remove'
  payload: {
    id: DialogId
    args?: Record<string, unknown>
  }
}

const reducer = (store: DialogStore, action: DialogAction) => {
  switch (action.type) {
    case 'show': {
      const { id, args = {} } = action.payload
      return {
        ...store,
        [id]: {
          ...store[id],
          id,
          args,
          open: true,
        },
      }
    }
    case 'hide': {
      const { id } = action.payload
      if (!(id in store)) {
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
