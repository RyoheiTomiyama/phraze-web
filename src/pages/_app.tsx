import { DialogProvider } from '@/components/common/dialog'
import { AuthProvider } from '@/components/feature/auth'
import { GraphProvider } from '@/components/feature/graph'
import { Toaster } from '@/components/ui/sonner'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <GraphProvider>
        <DialogProvider>
          <Component {...pageProps} />
        </DialogProvider>
        <Toaster />
      </GraphProvider>
    </AuthProvider>
  )
}
