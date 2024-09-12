// tailwindで設定されいるscreensと同じkeyを小さい順に指定する
export const screens = ['sm', 'md', 'lg', 'xl'] as const

export type Screen = (typeof screens)[number]

// TODO stateの持ち方改める
export type MediaQueryState = {
  // 現在の画面サイズ xsなら0-sm、xlならxl-∞
  screen: Screen
}
