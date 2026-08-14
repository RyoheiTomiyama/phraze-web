import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
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
