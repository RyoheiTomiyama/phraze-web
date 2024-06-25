import {
  InlineToolbar,
  InputEditor,
  ToolBold,
} from '@/components/common/editor'
import { useCallback, useEffect } from 'react'
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  EditorState,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  TextFormatType,
} from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { getMarkdownString } from '@/lib/lexical'
import {
  $convertFromMarkdownString,
  BOLD_STAR,
  BOLD_UNDERSCORE,
} from '@lexical/markdown'

// 必要なものを渡す
// onChange: (...event: any[]) => void;
// onBlur: Noop;
// value: FieldPathValue<TFieldValues, TName>;
// disabled?: boolean;
// name: TName;
// ref: RefCallBack;
type PhraseInputProps = {
  defaultValue?: string // markdown string
  onChange?: (mdString: string) => void
}

export function PhraseInput({ defaultValue = '', onChange }: PhraseInputProps) {
  const editorState = useCallback(() => {
    $convertFromMarkdownString(defaultValue, [BOLD_STAR, BOLD_UNDERSCORE])
  }, [defaultValue])

  const handleChange = useCallback(
    (editorState: EditorState, _editor: LexicalEditor) => {
      const mdString = getMarkdownString(editorState)
      onChange?.(mdString)
    },
    [onChange],
  )

  const plugins = [
    <ToolbarPlugin key="ToolbarPlugin" />,
    <OnChangePlugin
      key="OnChangePlugin"
      onChange={handleChange}
      ignoreSelectionChange
    />,
  ]

  return (
    <InputEditor
      defaultEditorState={editorState}
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
