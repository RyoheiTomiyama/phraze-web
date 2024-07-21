import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { ViewerBase, ViewerBaseProps } from './viewer-base'
import {
  HeadingNode,
  LinkNode,
  ListItemNode,
  ListNode,
  QuoteNode,
} from './node'
import { theme } from './editor-theme'

type ViewerProps = ViewerBaseProps & {
  className?: string
}

export const Viewer = ({ className, nodes, ...props }: ViewerProps) => {
  const editorBaseNodes = [
    HeadingNode,
    LinkNode,
    ListItemNode,
    ListNode,
    QuoteNode,
    ...(nodes ?? []),
  ]

  return (
    <ViewerBase {...props} theme={theme} nodes={editorBaseNodes}>
      <div className={className}>
        <RichTextPlugin
          contentEditable={<ContentEditable className="w-full" />}
          placeholder={<></>}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
    </ViewerBase>
  )
}
