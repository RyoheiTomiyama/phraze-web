import '@testing-library/jest-dom/vitest'
import React from 'react'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})

// jsdom は Element.prototype.scrollTo を実装していない。
// ScrollArea 配下の useEffect が content.scrollTo({...}) を呼ぶため polyfill する。
if (typeof Element.prototype.scrollTo !== 'function') {
  Element.prototype.scrollTo = (() => {}) as typeof Element.prototype.scrollTo
}

// Next.js の router / link を軽量スタブに置換
// （jsdom では本物が router context 依存で警告するため）
vi.mock('next/router', () => {
  return {
    useRouter: () => {
      return {
        push: vi.fn(),
        replace: vi.fn(),
        pathname: '/',
        query: {},
        asPath: '/',
      }
    },
  }
})

vi.mock('next/link', () => {
  // pathpida の $url() は href に { pathname, query, hash } オブジェクトを返す。
  // そのまま <a> に渡すと href が "[object Object]" になるため、
  // 文字列へシリアライズして a[href="..."] 形式で assert 可能にする。
  const serializeHref = (href: unknown): string => {
    if (typeof href === 'string') {
      return href
    }
    if (href === null || typeof href !== 'object') {
      return ''
    }
    const { pathname, query, hash } = href as {
      pathname?: string
      query?: Record<string, unknown>
      hash?: string
    }
    let path = pathname ?? ''
    const rest = new URLSearchParams()
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value === undefined || value === null) {
          continue
        }
        const token = `[${key}]`
        if (path.includes(token)) {
          path = path.replace(token, encodeURIComponent(String(value)))
        } else {
          rest.append(key, String(value))
        }
      }
    }
    const qs = rest.toString()
    return path + (qs ? `?${qs}` : '') + (hash ?? '')
  }
  return {
    default: ({
      children,
      href,
      ...props
    }: React.ComponentProps<'a'> & { href?: unknown }) => {
      return React.createElement(
        'a',
        { ...props, href: serializeHref(href) },
        children,
      )
    },
  }
})

// Sentry は外部 SDK 呼び出しなので空スタブ化（logger 経由も含め本物を呼ばない）
vi.mock('@/lib/sentry', () => {
  return {
    setSentryUser: vi.fn(),
    captureError: vi.fn(),
    captureLog: vi.fn(),
  }
})

/**
 * jsdom には Web Speech API が実装されていないため、テスト用に最小モックを注入する。
 * `speechSynthesis` は `getVoices/speak/cancel/speaking/addEventListener/removeEventListener` を持つ。
 * `SpeechSynthesisUtterance` はコールバック（onstart/onend/onerror）付きのモッククラス。
 */
type UtteranceMock = {
  text: string
  lang: string
  voice: SpeechSynthesisVoice | null
  onstart: (() => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
  // テストからコールバック発火を簡単にするため保持
}

const voices: SpeechSynthesisVoice[] = []

const speechSynthesisMock = {
  speaking: false,
  getVoices: () => {
    return voices
  },
  speak: (utter: UtteranceMock) => {
    speechSynthesisMock.speaking = true
    // 即座に再生開始→終了をシミュレートしない（テストが能動的に発火させる）
    void utter
  },
  cancel: () => {
    speechSynthesisMock.speaking = false
  },
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}

class SpeechSynthesisUtteranceMock {
  text: string
  lang = 'en-US'
  voice: SpeechSynthesisVoice | null = null
  onstart: (() => void) | null = null
  onend: (() => void) | null = null
  onerror: (() => void) | null = null
  constructor(text: string) {
    this.text = text
  }
}

Object.defineProperty(window, 'speechSynthesis', {
  value: speechSynthesisMock,
  configurable: true,
  writable: true,
})

Object.defineProperty(window, 'SpeechSynthesisUtterance', {
  value: SpeechSynthesisUtteranceMock,
  configurable: true,
  writable: true,
})

// テストから voices を操作できるようにグローバルへ公開
const g = globalThis as unknown as {
  __setVoices: (v: SpeechSynthesisVoice[]) => void
  __removeSpeechSynthesis: () => void
  __restoreSpeechSynthesis: () => void
}
g.__setVoices = (v) => {
  voices.length = 0
  voices.push(...v)
}

// 未対応環境のシミュレート（'speechSynthesis' in window を false にする）
g.__removeSpeechSynthesis = () => {
  delete (window as unknown as Record<string, unknown>).speechSynthesis
}
g.__restoreSpeechSynthesis = () => {
  Object.defineProperty(window, 'speechSynthesis', {
    value: speechSynthesisMock,
    configurable: true,
    writable: true,
  })
}
