import {
  GoogleAuthProvider,
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth'
import { firebase } from './firebase'

export const signInGoogle = async () => {
  try {
    const auth = getAuth(firebase)
    const result = await signInWithPopup(auth, new GoogleAuthProvider())

    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential?.idToken

    console.log(result, token)
  } catch (e) {
    console.error(e)
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
