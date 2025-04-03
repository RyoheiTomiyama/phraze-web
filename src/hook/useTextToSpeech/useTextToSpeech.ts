import { logger } from '@/lib/logger'
import { speak, Voice } from '@/lib/webSpeech'
import { useCallback, useEffect, useRef } from 'react'
import { toast } from 'sonner'

type UseTextToSpeechArgs =
  | {
      voice?: Voice
    }
  | undefined

export const useTextToSpeech = ({ voice }: UseTextToSpeechArgs = {}) => {
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

  const speakFn = useCallback(
    (words: string) => {
      try {
        stateRef.current = {
          stopped: true,
        }
        speak({
          text: words,
          voice,
          onStart: () => {
            stateRef.current = { ...stateRef.current, stopped: false }
          },
          onEnd: () => {
            stateRef.current = { ...stateRef.current, stopped: true }
          },
          onError: () => {
            stateRef.current = { ...stateRef.current, stopped: true }
          },
        })
      } catch (error) {
        if (error instanceof Error) {
          logger.warn(error.message)
          toast.warning('このブラウザは音声合成に対応していません。')
        } else {
          logger.error(error)
        }
      }
    },
    [voice],
  )

  return { speak: speakFn }
}
