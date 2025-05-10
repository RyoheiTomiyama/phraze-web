import { createContext, PropsWithChildren, useContext, useRef } from 'react'
import { LearningOptionState } from './learning-option-state'
import { createStore, useStore } from 'zustand'
import { persist } from 'zustand/middleware'

const createLearningOption = () => {
  return createStore<LearningOptionState>()(
    persist(
      (set, get) => {
        return {
          autoPlay: false,
          voiceOnly: false,
          setAutoPlay: (bool: boolean) => {
            return set({
              ...get(),
              autoPlay: bool,
            })
          },
          setVoiceOnly: (bool: boolean) => {
            return set({
              ...get(),
              voiceOnly: bool,
            })
          },
          // 音声設定
          voiceURI: undefined,
          setVoice: (v) => {
            return set({
              ...get(),
              voiceURI: v?.voiceURI,
            })
          },
        }
      },
      {
        name: 'phraze-learning-option',
        // Storageに保存するステート指定
        partialize: (state) => {
          return {
            autoPlay: state.autoPlay,
            voiceOnly: state.voiceOnly,
            voiceURI: state.voiceURI,
          }
        },
      },
    ),
  )
}
type LearningOptionContext = ReturnType<typeof createLearningOption>

const learningOptionContext = createContext<LearningOptionContext | undefined>(
  undefined,
)

export const LearningOptionProvider = ({ children }: PropsWithChildren) => {
  const ref = useRef<LearningOptionContext>()
  if (!ref.current) {
    ref.current = createLearningOption()
  }

  return (
    <learningOptionContext.Provider value={ref.current}>
      {children}
    </learningOptionContext.Provider>
  )
}

export const useLearningOption = <T,>(
  selector: (state: LearningOptionState) => T,
): T => {
  const store = useContext(learningOptionContext)
  if (!store) {
    throw new Error(`must be used within LearningOptionProvider`)
  }
  return useStore(store, selector)
}
