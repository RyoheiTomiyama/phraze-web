import { useContext, useMemo } from 'react'
import { mediaQueryContext } from './media-query-context'
import { Screen, screens } from './type'

type UseMediaQuery = {
  (minScreen: Screen): boolean
  ([minScreen, maxScreen]: [Screen | null, Screen | null]): boolean
}
export const useMediaQuery: UseMediaQuery = (args): boolean => {
  const { screen } = useContext(mediaQueryContext)

  const match = useMemo(() => {
    const isArray = Array.isArray(args)
    const minScreen = isArray ? args[0] : args
    const maxScreen = isArray ? args[1] : null

    const currentScreenIndex = screens.indexOf(screen)

    // スクリーンサイズが指定したブレークポイント以上なら true
    const isUp = minScreen
      ? currentScreenIndex >= screens.indexOf(minScreen)
      : true
    if (!isUp) {
      return false
    }

    // スクリーンサイズが指定したブレークポイントより小さければ true
    const isDown = maxScreen
      ? currentScreenIndex < screens.indexOf(maxScreen)
      : true
    return isDown
  }, [args, screen])

  return match
}
