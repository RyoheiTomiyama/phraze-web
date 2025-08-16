import { config } from './config'

type screens = typeof config.screens

export type Screen = screens[number]

export type MediaQueryState = {
  // 現在の画面幅がブレークポイント以上ならtrue
  screenState: {
    [key in Screen]?: boolean | undefined
  }
}
