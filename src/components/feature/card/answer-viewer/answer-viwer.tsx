import { Viewer } from '@/components/common/editor'
import { cn } from '@/lib/utils'
import { $convertFromMarkdownString } from '@lexical/markdown'
import { useCallback } from 'react'

type AnswerViewerProps = {
  /** markdown string */
  value: string
  show: boolean
}
export const AnswerViewer = ({ value, show }: AnswerViewerProps) => {
  const editorState = useCallback(() => {
    $convertFromMarkdownString(value, undefined, undefined, true)
  }, [value])

  return (
    <Viewer
      defaultEditorState={editorState}
      namespace="phrase"
      className={cn('transition-all filter blur-md', show && 'blur-0')}
    />
  )
}
