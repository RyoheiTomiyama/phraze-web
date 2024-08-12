import { InputViewer } from '@/components/common/editor'
import {
  $convertFromMarkdownString,
  BOLD_STAR,
  BOLD_UNDERSCORE,
} from '@lexical/markdown'
import { Volume2 } from 'lucide-react'
import { useCallback } from 'react'

type QuestionViewerProps = {
  /** markdown string */
  value: string
}
export const QuestionViewer = ({ value }: QuestionViewerProps) => {
  const editorState = useCallback(() => {
    $convertFromMarkdownString(value, [BOLD_STAR, BOLD_UNDERSCORE])
  }, [value])

  const pronouceWords = useCallback(() => {
    const utter = new SpeechSynthesisUtterance(value)
    utter.lang = 'en-US'
    speechSynthesis.speak(utter)
  }, [value])

  return (
    <div onClick={pronouceWords}>
      <Volume2 className="w-5" />
      <InputViewer
        defaultEditorState={editorState}
        namespace="phrase"
        className="[font-size:1.2em]"
      />
    </div>
  )
}
