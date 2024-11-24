import { useCallback, useEffect, useRef } from 'react'
import { toast } from 'sonner'

export const useTextToSpeech = () => {
  const stateRef = useRef({
    stopped: true,
  })

  useEffect(() => {
    return () => {
      if (!stateRef.current.stopped) {
        speechSynthesis.cancel()
      }
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
    stateRef.current = {
      stopped: true,
    }
    utter.onstart = () => {
      stateRef.current = { ...stateRef.current, stopped: false }
    }
    utter.onend = () => {
      stateRef.current = { ...stateRef.current, stopped: true }
    }
    utter.onerror = () => {
      stateRef.current = { ...stateRef.current, stopped: true }
    }

    speechSynthesis.speak(utter)
  }, [])

  return { speak }
}
