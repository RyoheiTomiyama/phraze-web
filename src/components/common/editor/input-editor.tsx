import { EditorBase, EditorBaseProps } from './editor-base'
import { NoLineBreakPlugin } from './plugin/no-line-break-plugin'

type InputEditorProps = EditorBaseProps

export const InputEditor = (props: InputEditorProps) => {
  const plugins = [<NoLineBreakPlugin key="NoLineBreakPlugin" />]

  return <EditorBase {...props} plugins={plugins} />
}
