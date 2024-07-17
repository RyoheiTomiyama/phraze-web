import { logger } from '@/lib/logger'
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
  theme?: InitialConfigType['theme']
}

export const EditorBase = ({
  autofocus = false,
  children,
  defaultEditorState,
  namespace = 'editor',
  nodes = [],
  plugins = [],
  theme = {},
}: PropsWithChildren<EditorBaseProps>) => {
  const initialConfig: InitialConfigType = {
    editorState: defaultEditorState,
    namespace,
    nodes,
    theme,
    onError: logger.error,
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
