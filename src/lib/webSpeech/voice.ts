import { Voice } from './types'

export const getVoices = (): Voice[] => {
  if (!('speechSynthesis' in window)) {
    throw new Error('このブラウザは音声合成に対応していません。')
  }

  return speechSynthesis.getVoices()
}
