import { Viewer } from '@/components/common/editor'
import { $convertFromMarkdownString } from '@lexical/markdown'
import { useCallback } from 'react'

type AnswerViewerProps = {
  /** markdown string */
  value: string
}
export const AnswerViewer = ({ value }: AnswerViewerProps) => {
  const editorState = useCallback(() => {
    $convertFromMarkdownString(value, undefined, undefined, true)
  }, [value])

  return <Viewer defaultEditorState={editorState} namespace="phrase" />
}
