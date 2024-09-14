import { config } from './config'

const screens = config.screens

export type Screen = (typeof screens)[number]

export type MediaQueryState = {
  // 現在の画面幅がブレークポイント以上ならtrue
  screenState: {
    [key in Screen]?: boolean | undefined
  }
}
