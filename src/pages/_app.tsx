import { DialogProvider } from '@/components/common/dialog'
import { AuthProvider } from '@/components/feature/auth'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <DialogProvider>
        <Component {...pageProps} />
      </DialogProvider>
    </AuthProvider>
  )
}
