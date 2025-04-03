import { Voice } from './types'

type SpeakArgs = {
  text: string
  voice?: Voice
  onStart?: () => void
  onEnd?: () => void
  onError?: () => void
}

export const speak = ({ text, voice, onEnd, onError, onStart }: SpeakArgs) => {
  if (!('speechSynthesis' in window)) {
    throw new Error('このブラウザは音声合成に対応していません。')
  }

  if (speechSynthesis.speaking) {
    speechSynthesis.cancel()
  }

  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = 'en-US'
  utter.voice = voice || null
  utter.onstart = () => {
    onStart?.()
  }
  utter.onend = () => {
    onEnd?.()
  }
  utter.onerror = () => {
    onError?.()
  }

  speechSynthesis.speak(utter)
}
