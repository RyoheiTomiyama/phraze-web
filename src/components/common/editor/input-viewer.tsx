import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { ViewerBase, ViewerBaseProps } from './viewer-base'

type InputViewerProps = ViewerBaseProps & {
  className?: string
}

export function InputViewer({ className, ...props }: InputViewerProps) {
  return (
    <ViewerBase {...props}>
      <div className={className}>
        <PlainTextPlugin
          contentEditable={<ContentEditable className="w-full" />}
          placeholder={<></>}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
    </ViewerBase>
  )
}
