import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect } from 'react'

export const DisabledPlugin = ({ disabled }: { disabled?: boolean }) => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (disabled === undefined) {
      return
    }
    editor.setEditable(!disabled)
  }, [disabled, editor])

  return null
}
