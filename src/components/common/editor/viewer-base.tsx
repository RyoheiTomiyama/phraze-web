import { logger } from '@/lib/logger'
import {
  InitialConfigType,
  InitialEditorStateType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer'
import { Fragment, PropsWithChildren, ReactElement } from 'react'

export type ViewerBaseProps = {
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

export const ViewerBase = ({
  children,
  defaultEditorState,
  namespace = 'viewer',
  nodes = [],
  plugins = [],
  theme = {},
}: PropsWithChildren<ViewerBaseProps>) => {
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
      {plugins.map((plugin, index) => {
        return <Fragment key={`plugin-${index}`}>{plugin}</Fragment>
      })}
    </LexicalComposer>
  )
}
