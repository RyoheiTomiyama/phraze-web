import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { COMMAND_PRIORITY_CRITICAL, KEY_ENTER_COMMAND } from 'lexical'
import { useEffect } from 'react'

/** 改行を禁止するプラグイン */
export const NoLineBreakPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      (payload) => {
        payload?.preventDefault()

        return true
      },
      COMMAND_PRIORITY_CRITICAL,
    )
  }, [editor])

  return null
}
