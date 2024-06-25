import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { EditorBase, EditorBaseProps } from './editor-base'
import { DisabledPlugin } from './plugin/disabled-plugin'
import { NoLineBreakPlugin } from './plugin/no-line-break-plugin'
import { cn } from '@/lib/utils'

type InputEditorProps = EditorBaseProps & {
  className?: string
  disabled?: boolean
  onBlue?: () => void
}

export function InputEditor({
  className,
  disabled,
  onBlue,
  plugins,
  ...props
}: InputEditorProps) {
  const editorBasePlugins = [
    <NoLineBreakPlugin key="NoLineBreakPlugin" />,
    <DisabledPlugin key="DisabledPlugin" disabled={disabled} />,
    ...(plugins ?? []),
  ]

  return (
    <EditorBase {...props} plugins={editorBasePlugins}>
      <div
        className={cn(
          `flex h-10 w-full rounded-md border border-input bg-background 
            px-3 py-2 text-sm ring-offset-background leading-6
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
            data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50`,
          className,
        )}
        data-disabled={disabled}
      >
        <PlainTextPlugin
          contentEditable={
            <ContentEditable
              className="w-full focus-visible:outline-none"
              onBlur={onBlue}
            />
          }
          placeholder={<></>}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
    </EditorBase>
  )
}
