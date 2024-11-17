import { createContext, PropsWithChildren, useContext, useRef } from 'react'
import { LearningOptionState } from './learning-option-state'
import { createStore } from 'zustand'
import { persist } from 'zustand/middleware'

const createLearningOption = () => {
  return createStore<LearningOptionState>()(
    persist(
      (_set) => {
        return {
          autoPlay: false,
          voiceOnly: false,
        }
      },
      { name: 'phraze-learning-option' },
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

export const useLearningOption = () => {
  const context = useContext(learningOptionContext)

  if (!context) {
    throw new Error(`must be used within LearningOptionProvider`)
  }

  return context
}
