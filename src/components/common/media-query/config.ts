type BaseConfig<S extends string> = {
  screens: ReadonlyArray<S>
  displayClasses: {
    [key in S]: string
  }
}

function createConfig<S extends string>(config: BaseConfig<S>): BaseConfig<S> {
  return config
}

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
