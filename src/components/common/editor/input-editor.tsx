import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { EditorBase, EditorBaseProps } from './editor-base'
import { DisabledPlugin } from './plugin/disabled-plugin'
import { NoLineBreakPlugin } from './plugin/no-line-break-plugin'
import { cn } from '@/lib/utils'

type InputEditorProps = EditorBaseProps & {
  className?: string
  disabled?: boolean
  onBlur?: () => void
  onClear?: () => void
  onEnter?: (evnet: KeyboardEvent | null) => void
}

export function InputEditor({
  className,
  disabled,
  placeholder,
  plugins,
  onBlur,
  onClear,
  onEnter,
  ...props
}: InputEditorProps) {
  const editorBasePlugins = [
    <NoLineBreakPlugin key="NoLineBreakPlugin" onEnter={onEnter} />,
    <DisabledPlugin key="DisabledPlugin" disabled={disabled} />,
    <ClearEditorPlugin key="ClearEditorPlugin" onClear={onClear} />,
    ...(plugins ?? []),
  ]

  return (
    <EditorBase {...props} plugins={editorBasePlugins}>
      <div
        className={cn(
          `flex h-10 w-full rounded-md border border-input bg-background 
            px-3 py-2 text-sm ring-offset-background leading-6
            focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
            data-disabled:cursor-not-allowed data-disabled:opacity-50`,
          className,
        )}
        data-disabled={disabled}
      >
        <PlainTextPlugin
          contentEditable={
            <ContentEditable
              className="w-full focus-visible:outline-hidden"
              onBlur={onBlur}
            />
          }
          placeholder={placeholder || <></>}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
    </EditorBase>
  )
}
