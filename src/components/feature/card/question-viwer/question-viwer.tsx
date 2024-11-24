import { InputViewer } from '@/components/common/editor'
import { useTextToSpeech } from '@/hook/useTextToSpeech'
import { cn } from '@/lib/utils'
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
  show?: boolean
}
export const QuestionViewer = ({ value, show = true }: QuestionViewerProps) => {
  const editorState = useCallback(() => {
    $convertFromMarkdownString(value, [BOLD_STAR, BOLD_UNDERSCORE])
  }, [value])

  const { speak } = useTextToSpeech()

  const pronouceWords = useCallback(() => {
    speak(value)
  }, [speak, value])

  return (
    <div onClick={pronouceWords}>
      <Volume2 className="w-5" />
      <InputViewer
        defaultEditorState={editorState}
        namespace="phrase"
        className={cn('[font-size:1.2em]', show ? 'blur-0' : 'blur-md')}
      />
    </div>
  )
}
