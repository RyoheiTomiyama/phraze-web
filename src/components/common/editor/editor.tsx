import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin'
import { EditorBase, EditorBaseProps } from './editor-base'
import { DisabledPlugin } from './plugin/disabled-plugin'
import { cn } from '@/lib/utils'
import { MarkdownShortcutPlugin } from './plugin/markdown-shortcut-plugin'
import {
  HeadingNode,
  LinkNode,
  ListItemNode,
  ListNode,
  QuoteNode,
} from './node'
import { theme } from './editor-theme'

type EditorProps = EditorBaseProps & {
  className?: string
  disabled?: boolean
  onBlue?: () => void
}

export const Editor = ({
  className,
  disabled,
  onBlue,
  plugins,
  nodes,
  ...props
}: EditorProps) => {
  const editorBasePlugins = [
    <TabIndentationPlugin key="TabIndentationPlugin" />,
    <ListPlugin key="ListPlugin" />,
    <DisabledPlugin key="DisabledPlugin" disabled={disabled} />,
    <MarkdownShortcutPlugin key="MarkdownShortcutPlugin" />,
    ...(plugins ?? []),
  ]

  const editorBaseNodes = [
    HeadingNode,
    LinkNode,
    ListItemNode,
    ListNode,
    QuoteNode,
    ...(nodes ?? []),
  ]

  return (
    <EditorBase
      {...props}
      theme={theme}
      nodes={editorBaseNodes}
      plugins={editorBasePlugins}
    >
      <div
        className={cn(
          `flex h-10 w-full rounded-md border border-input bg-background 
      px-3 py-2 text-sm ring-offset-background 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
      data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50`,
          className,
        )}
      >
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="w-full leading-6 focus-visible:outline-none "
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
