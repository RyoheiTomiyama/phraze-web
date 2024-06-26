import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import {
  InitialConfigType,
  InitialEditorStateType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { Fragment, PropsWithChildren, ReactElement } from 'react'

export type EditorBaseProps = {
  autofocus?: boolean
  defaultEditorState?: InitialEditorStateType
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
  children,
  defaultEditorState,
  namespace = 'editor',
  nodes = [],
  plugins = [],
}: PropsWithChildren<EditorBaseProps>) => {
  const initialConfig: InitialConfigType = {
    editorState: defaultEditorState,
    namespace,
    nodes,
    theme: {},
    // eslint-disable-next-line no-console
    onError: console.error,
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      {children}

      <HistoryPlugin />
      {autofocus && <AutoFocusPlugin />}
      {plugins.map((plugin, index) => {
        return <Fragment key={`plugin-${index}`}>{plugin}</Fragment>
      })}
    </LexicalComposer>
  )
}
