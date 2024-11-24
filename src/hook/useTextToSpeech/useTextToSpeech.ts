import { useCallback, useEffect } from 'react'
import { toast } from 'sonner'

export const useTextToSpeech = () => {
  useEffect(() => {
    return () => {
      speechSynthesis.cancel()
    }
  }, [])

  const speak = useCallback((words: string) => {
    if (!('speechSynthesis' in window)) {
      toast.warning('このブラウザは音声合成に対応していません。')
      return
    }

    if (speechSynthesis.speaking) {
      speechSynthesis.cancel()
    }

    const utter = new SpeechSynthesisUtterance(words)
    utter.lang = 'en-US'
    speechSynthesis.speak(utter)
  }, [])

  return { speak }
}
