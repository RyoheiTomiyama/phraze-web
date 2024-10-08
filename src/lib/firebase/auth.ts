import {
  GoogleAuthProvider,
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth'
import { firebase } from './firebase'
import { add } from '@/lib/date-util'
import { logger } from '@/lib/logger'

export const signInGoogle = async () => {
  try {
    const auth = getAuth(firebase)
    const result = await signInWithPopup(auth, new GoogleAuthProvider())

    logger.debug(result)

    return true
  } catch (e) {
    logger.error(e)

    return false
  }
}

/** ログインできるか認証する */
export const verify = (cb: (u: User | undefined) => void) => {
  const auth = getAuth(firebase)

  // 返り値にunsubscribeする関数が入ってる
  return onAuthStateChanged(auth, async (user) => {
    cb(user || undefined)
  })
}

export const getIdToken = async () => {
  const user = getAuth(firebase).currentUser
  if (!user) {
    return
  }
  const result = await user.getIdTokenResult()
  const expired = new Date(result.expirationTime)

  // 期限が近い場合は、トークンを更新しておく
  if (expired < add(new Date(), { minutes: 5 })) {
    return user.getIdToken(true)
  }
  return user.getIdToken()
}

export const refreshIdToken = async (): Promise<string | undefined> => {
  const user = getAuth(firebase).currentUser
  if (!user) {
    return
  }

  return user.getIdToken(true)
}

export const signOut = async () => {
  const auth = getAuth()
  return auth.signOut()
}
