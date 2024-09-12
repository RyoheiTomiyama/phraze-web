import {
  PropsWithChildren,
  RefCallback,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Screen, screens } from './type'
import { mediaQueryContext } from './media-query-context'
// 0 ------- sm ------ md ------ lg ----- xl
//   <--sm-->
//   <-------md------->
//   <------------lg------------->
//   <------------------xl---------------->

// {
//     sm: true,
//     md: true,
//     lg: false,
//     xl: false
// }
// この持ち方が良さそう

// cssで隠し要素を表示させて、現在のスクリーンサイズを検知する
// providerで管理する
export const MediaQueryProvider = ({ children }: PropsWithChildren) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('')
  const ref = useRef<{ [key in Screen]: HTMLSpanElement | null }>({
    sm: null,
    md: null,
    lg: null,
    xl: null,
  })

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry || !(entry.target instanceof HTMLElement)) {
        return
      }
      const s = entry.target.dataset['screen']
      if (!isScreen(s)) {
        return
      }
      if (entry.isIntersecting) {
        // 画面から対象が表示されるとき
        setCurrentScreen(s)
      } else {
        // 画面から対象が非表示になるとき
      }
    })
    Object.entries(ref.current).map(([_screen, node]) => {
      if (node) {
        observer.observe(node)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const entryRef = useCallback<RefCallback<HTMLSpanElement>>((node) => {
    if (!node) {
      return
    }
    const screen = node.dataset['screen']
    if (isScreen(screen)) {
      ref.current[screen] = node
    }
  }, [])

  return (
    <>
      <mediaQueryContext.Provider value={{ screen: 'xl' }}>
        {children}
      </mediaQueryContext.Provider>
      <span
        className="w-0 h-0 fixed top-0 left-0 hidden sm:block"
        data-screen="sm"
        ref={entryRef}
      />
      <span
        className="w-0 h-0 fixed top-0 left-0 hidden md:block"
        data-screen="md"
        ref={entryRef}
      />
      <span
        className="w-0 h-0 fixed top-0 left-0 hidden lg:block"
        data-screen="lg"
        ref={entryRef}
      />
      <span
        className="w-0 h-0 fixed top-0 left-0 hidden xl:block"
        data-screen="xl"
        ref={entryRef}
      />
    </>
  )
}

function isScreen(screen: string | undefined): screen is Screen {
  if (!screen) {
    return false
  }

  return screens.some((s) => {
    return s === screen
  })
}
