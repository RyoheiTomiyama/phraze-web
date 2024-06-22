import {
  InlineToolbar,
  InputEditor,
  ToolBold,
} from '@/components/common/editor'
import { useEffect } from 'react'
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  FORMAT_TEXT_COMMAND,
  TextFormatType,
} from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

export function PhraseInput() {
  const plugins = [<ToolbarPlugin key="ToolbarPlugin" />]

  return (
    <InputEditor
      className="min-h-10 h-auto py-[7px]"
      namespace="phrase"
      plugins={plugins}
    />
  )
}

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    // InputEditorはPlainEditorなので、TextNodeのFormatだけ登録する
    return editor.registerCommand<TextFormatType>(
      FORMAT_TEXT_COMMAND,
      (format) => {
        // 太字以外は使えないようにする
        if (format !== 'bold') {
          return false
        }
        const selection = $getSelection()
        if (!$isRangeSelection(selection)) {
          return false
        }
        selection.formatText(format)
        return true
      },
      COMMAND_PRIORITY_EDITOR,
    )
  }, [editor])

  return (
    <InlineToolbar>
      <ToolBold showLabel />
    </InlineToolbar>
  )
}

export default PhraseInput
