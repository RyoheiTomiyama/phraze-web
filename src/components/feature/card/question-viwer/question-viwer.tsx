import { InputViewer } from '@/components/common/editor'
import {
  $convertFromMarkdownString,
  BOLD_STAR,
  BOLD_UNDERSCORE,
} from '@lexical/markdown'
import { useCallback } from 'react'

type QuestionViewerProps = {
  /** markdown string */
  value: string
}
export const QuestionViewer = ({ value }: QuestionViewerProps) => {
  const editorState = useCallback(() => {
    $convertFromMarkdownString(value, [BOLD_STAR, BOLD_UNDERSCORE])
  }, [value])

  return <InputViewer defaultEditorState={editorState} namespace="phrase" />
}
