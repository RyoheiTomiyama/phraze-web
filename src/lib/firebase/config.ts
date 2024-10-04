import { clientEnv } from '../env'

const firebaseConfig = {
  apiKey: clientEnv.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: `${clientEnv.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: clientEnv.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: `${clientEnv.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: clientEnv.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: clientEnv.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: `G-${clientEnv.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`,
}

export default firebaseConfig
