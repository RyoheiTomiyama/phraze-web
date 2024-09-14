// tailwindで設定されているscreensと同じkeyを小さい順に指定する
export const screens = ['sm', 'md', 'lg', 'xl'] as const

export type Screen = (typeof screens)[number]

export type MediaQueryState = {
  // 現在の画面幅がブレークポイント以上ならtrue
  screenState: {
    [key in Screen]?: boolean | undefined
  }
}
