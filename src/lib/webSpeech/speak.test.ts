import { afterEach, describe, expect, it, vi } from 'vitest'
import { speak } from './speak'
import type { Voice } from './types'

const g = globalThis as unknown as {
  __removeSpeechSynthesis: () => void
  __restoreSpeechSynthesis: () => void
}

const voice = (lang: string, voiceURI = lang): Voice => {
  return {
    lang,
    voiceURI,
    name: lang,
  } as Voice
}

afterEach(() => {
  g.__restoreSpeechSynthesis()
  ;(window.speechSynthesis as { speaking: boolean }).speaking = false
  vi.restoreAllMocks()
})

describe('speak', () => {
  it('speechSynthesis 非対応環境では throw する', () => {
    g.__removeSpeechSynthesis()
    expect(() => {
      return speak({ text: 'hi' })
    }).toThrow('このブラウザは音声合成に対応していません。')
  })

  it('再生中は cancel を呼ぶ', () => {
    const cancelSpy = vi.spyOn(window.speechSynthesis, 'cancel')
    ;(window.speechSynthesis as { speaking: boolean }).speaking = true

    speak({ text: 'hi' })

    expect(cancelSpy).toHaveBeenCalled()
  })

  it('再生中でなければ cancel を呼ばない', () => {
    const cancelSpy = vi.spyOn(window.speechSynthesis, 'cancel')
    ;(window.speechSynthesis as { speaking: boolean }).speaking = false

    speak({ text: 'hi' })

    expect(cancelSpy).not.toHaveBeenCalled()
  })

  it('SpeechSynthesisUtterance を生成して speak に渡す', () => {
    const speakSpy = vi.spyOn(window.speechSynthesis, 'speak')
    speak({ text: 'hello' })

    expect(speakSpy).toHaveBeenCalledTimes(1)
    const utter = speakSpy.mock.calls[0]?.[0] as {
      text: string
      lang: string
      voice: Voice | null
    }
    expect(utter.text).toBe('hello')
    expect(utter.lang).toBe('en-US')
  })

  it('voice を渡すと utterance.voice に設定される', () => {
    const speakSpy = vi.spyOn(window.speechSynthesis, 'speak')
    const v = voice('en-US', 'voice-en')
    speak({ text: 'hi', voice: v })

    const utter = speakSpy.mock.calls[0]?.[0] as { voice: Voice | null }
    expect(utter.voice).toBe(v)
  })

  it('voice 未指定時は utterance.voice は null', () => {
    const speakSpy = vi.spyOn(window.speechSynthesis, 'speak')
    speak({ text: 'hi' })

    const utter = speakSpy.mock.calls[0]?.[0] as { voice: Voice | null }
    expect(utter.voice).toBeNull()
  })

  it('コールバックが utterance に設定される', () => {
    const speakSpy = vi.spyOn(window.speechSynthesis, 'speak')
    const onStart = vi.fn()
    const onEnd = vi.fn()
    const onError = vi.fn()

    speak({ text: 'hi', onStart, onEnd, onError })

    const utter = speakSpy.mock.calls[0]?.[0] as unknown as {
      onstart: () => void
      onend: () => void
      onerror: () => void
    }
    utter.onstart()
    utter.onend()
    utter.onerror()
    expect(onStart).toHaveBeenCalledTimes(1)
    expect(onEnd).toHaveBeenCalledTimes(1)
    expect(onError).toHaveBeenCalledTimes(1)
  })
})
