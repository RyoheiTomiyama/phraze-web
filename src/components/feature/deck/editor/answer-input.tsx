import { Editor, InlineToolbar, ToolBold } from '@/components/common/editor'
import { forwardRef, useCallback, useEffect } from 'react'
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
import { $convertFromMarkdownString } from '@lexical/markdown'

// 必要なものを渡す
// onChange: (...event: any[]) => void;
// onBlur: Noop;
// value: FieldPathValue<TFieldValues, TName>;
// disabled?: boolean;
// name: TName;
// ref: RefCallBack;
type AnswerInputProps = {
  defaultValue?: string // markdown string
  disabled?: boolean
  onBlur?: () => void
  onChange?: (mdString: string) => void
}

export const AnswerInput = forwardRef<HTMLDivElement, AnswerInputProps>(
  function AnswerInput(
    { defaultValue = '', disabled, onBlur, onChange },
    _ref,
  ) {
    const editorState = useCallback(() => {
      $convertFromMarkdownString(defaultValue, undefined, undefined, true)
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
      <Editor
        onBlue={onBlur}
        defaultEditorState={editorState}
        disabled={disabled}
        className="min-h-60 h-auto py-[7px]"
        namespace="phrase"
        plugins={plugins}
      />
    )
  },
)

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
