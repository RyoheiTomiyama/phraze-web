import { LEARNING_OPTION } from './learning-options'

export type LearningOptionState = {
  [key in LEARNING_OPTION]: boolean
}
