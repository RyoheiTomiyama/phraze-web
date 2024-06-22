import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { COMMAND_PRIORITY_LOW, SELECTION_CHANGE_COMMAND } from 'lexical'
import { useEffect } from 'react'

/** 選択範囲が変更になったときのリスナー */
export const useSelectionChangeListener = (fn: () => void) => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    editor.update(() => {
      editor.getEditorState().read(() => {
        fn()
      })
    })
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        fn()
        return false
      },
      COMMAND_PRIORITY_LOW,
    )
  }, [editor, fn])
}
