import { beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { getVoices as getVoicesMock, speak as speakMock } from '@/lib/webSpeech'
import { toast } from 'sonner'
import { useTextToSpeech } from './useTextToSpeech'

vi.mock('@/lib/webSpeech', () => {
  return {
    getVoices: vi.fn(() => {
      return []
    }),
    onVoicesChanged: vi.fn(() => {
      return () => {}
    }),
    speak: vi.fn(),
  }
})

vi.mock('sonner', () => {
  return {
    toast: {
      warning: vi.fn(),
      error: vi.fn(),
      success: vi.fn(),
    },
  }
})

vi.mock('@/lib/logger', () => {
  return {
    logger: {
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    },
  }
})

const enVoice = {
  voiceURI: 'voice-en',
  lang: 'en-US',
  name: 'en-US voice',
} as SpeechSynthesisVoice

beforeEach(() => {
  vi.mocked(getVoicesMock).mockReturnValue([enVoice])
  vi.mocked(speakMock).mockReset()
  vi.mocked(speakMock).mockImplementation(() => {
    return undefined
  })
  vi.mocked(toast.warning).mockClear()
})

describe('useTextToSpeech', () => {
  it('voiceURI に一致する音声を選択する', () => {
    const { result } = renderHook(() => {
      return useTextToSpeech({ voiceURI: 'voice-en' })
    })
    expect(result.current.voice).toEqual(enVoice)
  })

  it('一致する voiceURI がないとき voice は undefined', () => {
    const { result } = renderHook(() => {
      return useTextToSpeech({ voiceURI: 'unknown' })
    })
    expect(result.current.voice).toBeUndefined()
  })

  it('speak() で内部の speak を呼ぶ', () => {
    const { result } = renderHook(() => {
      return useTextToSpeech({ voiceURI: 'voice-en' })
    })
    act(() => {
      result.current.speak('hello')
    })
    expect(speakMock).toHaveBeenCalledTimes(1)
    expect(speakMock).toHaveBeenCalledWith(
      expect.objectContaining({ text: 'hello', voice: enVoice }),
    )
  })

  it('speak() に上書き音声を渡せる', () => {
    const other = {
      voiceURI: 'other',
      lang: 'en-GB',
      name: 'other',
    } as SpeechSynthesisVoice
    const { result } = renderHook(() => {
      return useTextToSpeech({ voiceURI: 'voice-en' })
    })
    act(() => {
      result.current.speak('hi', other)
    })
    expect(speakMock).toHaveBeenCalledWith(
      expect.objectContaining({ text: 'hi', voice: other }),
    )
  })

  it('speak が throw したとき toast.warning を出す', () => {
    vi.mocked(speakMock).mockImplementation(() => {
      throw new Error('no support')
    })
    const { result } = renderHook(() => {
      return useTextToSpeech({ voiceURI: 'voice-en' })
    })
    act(() => {
      result.current.speak('hi')
    })
    expect(toast.warning).toHaveBeenCalledWith(
      'このブラウザは音声合成に対応していません。',
    )
  })
})
