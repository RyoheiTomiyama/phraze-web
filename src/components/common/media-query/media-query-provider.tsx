import {
  PropsWithChildren,
  RefCallback,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { MediaQueryState, Screen } from './type'
import { mediaQueryContext } from './media-query-context'
import { cn } from '@/lib/utils'
import { config } from './config'

// cssで隠し要素を表示させて、現在のスクリーンサイズを検知する
// providerで管理する
export const MediaQueryProvider = ({ children }: PropsWithChildren) => {
  const [screenState, setScreenState] = useState<
    MediaQueryState['screenState']
  >({})
  const ref = useRef<{ [key in Screen]?: HTMLSpanElement | null }>({})

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry || !(entry.target instanceof HTMLElement)) {
        return
      }
      const s = entry.target.dataset['screen']
      if (!isScreen(s)) {
        return
      }

      setScreenState((state) => {
        return {
          ...state,
          [s]: entry.isIntersecting,
        }
      })
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

  // Note: refひとつでSpanを管理するためにCallback Refを使う
  const entryRef = useCallback<RefCallback<HTMLSpanElement>>((node) => {
    if (!node) {
      return
    }
    const screen = node.dataset['screen']
    if (isScreen(screen)) {
      // 初期値投入
      const display = window.getComputedStyle(node)['display']
      setScreenState((state) => {
        return {
          ...state,
          [screen]: display !== 'none',
        }
      })

      ref.current[screen] = node
    }
  }, [])

  return (
    <>
      <mediaQueryContext.Provider value={{ screenState }}>
        {children}
      </mediaQueryContext.Provider>
      {Object.entries(config.displayClasses).map(([key, className]) => {
        return (
          <span
            key={key}
            className={cn('w-0 h-0 fixed top-0 left-0 hidden', className)}
            data-screen={key}
            ref={entryRef}
          />
        )
      })}
    </>
  )
}

function isScreen(screen: string | undefined): screen is Screen {
  if (!screen) {
    return false
  }

  return config.screens.some((s) => {
    return s === screen
  })
}
