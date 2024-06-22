import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { Fragment, ReactElement } from 'react'

export type EditorBaseProps = {
  autofocus?: boolean
  namespace?: InitialConfigType['namespace']
  nodes?: InitialConfigType['nodes']
  placeholder?:
    | ((isEditable: boolean) => null | JSX.Element)
    | null
    | JSX.Element
  plugins?: ReactElement[]
}

export const EditorBase = ({
  autofocus = false,
  namespace = 'editor',
  nodes = [],
  placeholder = null,
  plugins = [],
}: EditorBaseProps) => {
  const initialConfig: InitialConfigType = {
    namespace,
    nodes,
    theme: {},
    // eslint-disable-next-line no-console
    onError: console.error,
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div
        className="flex h-10 w-full rounded-md border border-input bg-background 
      px-3 py-2 text-sm ring-offset-background 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
      disabled:cursor-not-allowed disabled:opacity-50"
      >
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="w-full leading-6 focus-visible:outline-none"></ContentEditable>
          }
          placeholder={placeholder}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>

      <HistoryPlugin />
      {autofocus && <AutoFocusPlugin />}
      {plugins.map((plugin, index) => {
        return <Fragment key={`plugin-${index}`}>{plugin}</Fragment>
      })}
    </LexicalComposer>
  )
}
