import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import {
  COMMAND_PRIORITY_CRITICAL,
  KEY_ENTER_COMMAND,
  LineBreakNode,
} from 'lexical'
import { useEffect } from 'react'

type NoLineBreakPluginProps = {
  onEnter?: (evnet: KeyboardEvent | null) => void
}
/** 改行を禁止するプラグイン */
export const NoLineBreakPlugin = ({ onEnter }: NoLineBreakPluginProps) => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        KEY_ENTER_COMMAND,
        (payload) => {
          onEnter?.(payload)

          return true
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      editor.registerNodeTransform(LineBreakNode, (node) => {
        node.remove()
      }),
    )
  }, [editor, onEnter])

  return null
}
