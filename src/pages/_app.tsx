import { DialogProvider } from '@/components/common/dialog'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DialogProvider>
      <Component {...pageProps} />
    </DialogProvider>
  )
}
