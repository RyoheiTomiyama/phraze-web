import {
  InlineToolbar,
  InputEditor,
  ToolBold,
} from '@/components/common/editor'
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
import {
  $convertFromMarkdownString,
  BOLD_STAR,
  BOLD_UNDERSCORE,
} from '@lexical/markdown'
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin'

// 必要なものを渡す
// onChange: (...event: any[]) => void;
// onBlur: Noop;
// value: FieldPathValue<TFieldValues, TName>;
// disabled?: boolean;
// name: TName;
// ref: RefCallBack;
type PhraseInputProps = {
  defaultValue?: string // markdown string
  disabled?: boolean
  placeholder?:
    | ((isEditable: boolean) => null | React.JSX.Element)
    | null
    | React.JSX.Element
  onBlur?: () => void
  onChange?: (mdString: string) => void
  onClear?: () => void
  onEnter?: (event: KeyboardEvent | null) => void
}

export const PhraseInput = forwardRef<LexicalEditor, PhraseInputProps>(
  function PhraseInput(
    {
      defaultValue = '',
      disabled,
      placeholder,
      onBlur,
      onChange,
      onClear,
      onEnter,
    },
    ref,
  ) {
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
      ...(ref
        ? [<EditorRefPlugin key="EditorRefPlugin" editorRef={ref} />]
        : []),
      <ToolbarPlugin key="ToolbarPlugin" />,
      <OnChangePlugin
        key="OnChangePlugin"
        onChange={handleChange}
        ignoreSelectionChange
      />,
    ]

    return (
      <InputEditor
        onBlur={onBlur}
        onClear={onClear}
        onEnter={onEnter}
        defaultEditorState={editorState}
        disabled={disabled}
        className="min-h-10 h-auto py-[7px]"
        namespace="phrase"
        plugins={plugins}
        placeholder={placeholder}
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
