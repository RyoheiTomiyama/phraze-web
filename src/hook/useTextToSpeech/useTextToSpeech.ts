import { logger } from '@/lib/logger'
import { getVoices, onVoicesChanged, speak, Voice } from '@/lib/webSpeech'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'

type SpeakFn = {
  (words: string): void
  (words: string, voice: Voice): void
}

type UseTextToSpeechArgs =
  | {
      voiceURI?: string
    }
  | undefined

export const useTextToSpeech = ({ voiceURI }: UseTextToSpeechArgs = {}) => {
  const [voices, setVoices] = useState(getVoices())
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

  useEffect(() => {
    return onVoicesChanged((voices) => {
      setVoices(voices)
    })
  }, [])

  const voice = useMemo(() => {
    return voices.find((v) => {
      return v.voiceURI === voiceURI
    })
  }, [voiceURI, voices])

  const speakFn = useCallback<SpeakFn>(
    (words: string, overwriteVoice?: Voice) => {
      try {
        stateRef.current = {
          stopped: true,
        }
        speak({
          text: words,
          voice: overwriteVoice || voice,
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

  return { speak: speakFn, voice }
}
