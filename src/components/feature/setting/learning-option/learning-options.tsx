export const LEARNING_OPTION = {
  VOICE_ONLY: 'voiceOnly',
  AUTO_PLAY: 'autoPlay',
} as const

export type LEARNING_OPTION =
  (typeof LEARNING_OPTION)[keyof typeof LEARNING_OPTION]

export const learningOptions = {
  voiceOnly: {
    name: '音声のみモード',
    description: '問題文を隠して音声再生のみで解答する形式にします。',
  },
  autoPlay: {
    name: '自動再生',
    description: '問題が表示されたら自動で音声読み上げを行います。',
  },
} as const satisfies {
  [key in LEARNING_OPTION]: {
    name: string
    description: string
  }
}
