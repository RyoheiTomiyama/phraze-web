# MediaQuery

tailwindcssのブレークポイントを使って、JSでもメディアクエリを制御する。

## 使い方

1. md以上のスクリーンを判定する(推奨)

```ts
const isDesktop = useMediaQuery('md')
```

2. md~lgのスクリーンを判定する

```ts
const isMiddleSize = useMediaQuery(['md', 'lg'])
```

3. sm未満のスクリーンを判定する

```ts
const isMobile = useMediaQuery([null, 'sm'])
```

## 設定変更

tailwindcssのscreensをカスタマイズした場合、`media-query/config.ts` を編集してください。

```ts
export const config = createConfig({
  // tailwindで設定されているscreensと同じkeyを指定する
  screens: ['sm', 'md', 'lg', 'xl'],
  // 各スクリーンの出現条件 基本的にはsm:blockのように指定する
  // Note: tailwindcssの仕組み上動的に生成できないので、文字列で指定する必要がある
  displayClasses: {
    sm: 'sm:block',
    md: 'md:block',
    lg: 'lg:block',
    xl: 'xl:block',
  },
})
```

## しくみ

DOMに`hidden md:block`クラスの要素をscreens分配置して、その要素の表示・非表示で監視することで、tailwindcssのブレークポイントを動的に受け取っている
