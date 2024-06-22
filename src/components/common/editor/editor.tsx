import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { EditorBase, EditorBaseProps } from './editor-base'

type EditorProps = EditorBaseProps

export const Editor = (props: EditorProps) => {
  return (
    <EditorBase {...props}>
      <div
        className="flex h-10 w-full rounded-md border border-input bg-background 
      px-3 py-2 text-sm ring-offset-background 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
      disabled:cursor-not-allowed disabled:opacity-50"
      >
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="w-full leading-6 focus-visible:outline-none" />
          }
          placeholder={<></>}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
    </EditorBase>
  )
}
