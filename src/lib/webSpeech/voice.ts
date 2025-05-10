import { Voice } from './types'

export const getVoices = (): Voice[] => {
  if (!('speechSynthesis' in window)) {
    throw new Error('このブラウザは音声合成に対応していません。')
  }

  return speechSynthesis.getVoices().filter((v) => {
    return v.lang.startsWith('en-')
  })
}

/** Web Speech APIでは、タイミングによって使える音声が変化するので、検知する関数を用意する
 * hooks内で使う場合は、returnでイベントを破棄すること。
 */
export const onVoicesChanged = (cb: (voices: Voice[]) => void) => {
  const listener = (_event: Event) => {
    cb(getVoices())
  }

  speechSynthesis.addEventListener('voiceschanged', listener)

  return () => {
    speechSynthesis.removeEventListener('voiceschanged', listener)
  }
}
