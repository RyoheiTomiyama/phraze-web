export type DialogId = string

export type DialogState = {
  id: DialogId
  args?: Record<string, unknown>
  open: boolean
  keepMounted?: boolean
}

export type DialogStore = {
  [key: DialogId]: DialogState
}
