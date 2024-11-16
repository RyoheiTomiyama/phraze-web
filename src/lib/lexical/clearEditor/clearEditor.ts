import { CLEAR_EDITOR_COMMAND, LexicalEditor } from 'lexical'

export const clearEditor = (editor: LexicalEditor | null | undefined) => {
  if (!editor) {
    return
  }

  return editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined)
}
