import { ComponentType } from 'react'

export type DialogId = string

export type DialogState = {
  open: boolean
  keepMounted?: boolean
}
export type DialogMeta<P = Record<string, unknown>> = {
  id: DialogId
  Component: ComponentType<P>
  args?: P
}

export type DialogStore = {
  [key: DialogId]: DialogState & DialogMeta
}
