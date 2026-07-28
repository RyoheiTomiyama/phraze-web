import { afterEach, describe, expect, it, vi } from 'vitest'
import { getVoices, onVoicesChanged } from './voice'

const g = globalThis as unknown as {
  __setVoices: (v: SpeechSynthesisVoice[]) => void
  __removeSpeechSynthesis: () => void
  __restoreSpeechSynthesis: () => void
}

const voice = (lang: string, voiceURI = lang): SpeechSynthesisVoice => {
  return {
    lang,
    voiceURI,
    name: lang,
  } as SpeechSynthesisVoice
}

afterEach(() => {
  g.__setVoices([])
  g.__restoreSpeechSynthesis()
})

describe('getVoices', () => {
  it('en-* の lang の音声だけを返す', () => {
    g.__setVoices([
      voice('en-US'),
      voice('en-GB'),
      voice('ja-JP'),
      voice('fr-FR'),
    ])
    expect(
      getVoices().map((v) => {
        return v.lang
      }),
    ).toEqual(['en-US', 'en-GB'])
  })

  it('en-* に合致しない場合は空配列を返す', () => {
    g.__setVoices([voice('ja-JP'), voice('fr-FR')])
    expect(getVoices()).toEqual([])
  })

  it('speechSynthesis 非対応環境では throw する', () => {
    g.__removeSpeechSynthesis()
    expect(() => {
      return getVoices()
    }).toThrow('このブラウザは音声合成に対応していません。')
  })
})

describe('onVoicesChanged', () => {
  it('voiceschanged リスナを登録する', () => {
    const cb = vi.fn()
    const cleanup = onVoicesChanged(cb)
    expect(window.speechSynthesis.addEventListener).toHaveBeenCalledWith(
      'voiceschanged',
      expect.any(Function),
    )
    cleanup()
  })

  it('戻り値の cleanup でリスナを破棄する', () => {
    const cleanup = onVoicesChanged(vi.fn())
    cleanup()
    expect(window.speechSynthesis.removeEventListener).toHaveBeenCalledWith(
      'voiceschanged',
      expect.any(Function),
    )
  })

  it('voiceschanged 発火で getVoices の結果をコールバックに渡す', () => {
    g.__setVoices([voice('en-US')])
    const cb = vi.fn()
    const cleanup = onVoicesChanged(cb)

    // addEventListener に渡された listener を取り出して発火
    const listener = vi
      .mocked(window.speechSynthesis.addEventListener)
      .mock.calls.at(-1)?.[1] as (e: Event) => void
    listener(new Event('voiceschanged'))
    expect(cb).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining({ lang: 'en-US' })]),
    )
    cleanup()
  })
})
