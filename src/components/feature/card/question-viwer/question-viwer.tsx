import { InputViewer } from '@/components/common/editor'
import { cn } from '@/lib/utils'
import {
  $convertFromMarkdownString,
  BOLD_STAR,
  BOLD_UNDERSCORE,
} from '@lexical/markdown'
import { Volume2 } from 'lucide-react'
import { useCallback, useEffect } from 'react'

type QuestionViewerProps = {
  /** markdown string */
  value: string
  show?: boolean
}
export const QuestionViewer = ({ value, show = true }: QuestionViewerProps) => {
  const editorState = useCallback(() => {
    $convertFromMarkdownString(value, [BOLD_STAR, BOLD_UNDERSCORE])
  }, [value])

  useEffect(() => {
    return () => {
      speechSynthesis.cancel()
    }
  }, [])

  const pronouceWords = useCallback(() => {
    if (speechSynthesis.speaking) {
      return
    }

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
        className={cn('[font-size:1.2em]', show ? 'blur-0' : 'blur-md')}
      />
    </div>
  )
}
