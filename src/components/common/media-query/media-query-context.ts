import { createContext } from 'react'
import { MediaQueryState } from './type'

export const mediaQueryContext = createContext<MediaQueryState>({
  screenState: {},
})
