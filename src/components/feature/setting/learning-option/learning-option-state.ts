import { Voice } from '@/lib/webSpeech'
import { LEARNING_OPTION } from './learning-options'

export type LearningOptionState = {
  [key in LEARNING_OPTION]: boolean
} & {
  setAutoPlay: (bool: boolean) => void
  setVoiceOnly: (bool: boolean) => void
} & {
  // 音声設定
  voiceURI?: string
  setVoice: (v: Voice | undefined) => void
}
