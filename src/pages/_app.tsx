import { DialogProvider } from '@/components/common/dialog'
import { ThemeProvider } from '@/components/common/theme'
import { AuthProvider } from '@/components/feature/auth'
import { GraphProvider } from '@/components/feature/graph'
import { Toaster } from '@/components/ui/sonner'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="system">
      <AuthProvider>
        <GraphProvider>
          <DialogProvider>
            <Component {...pageProps} />
          </DialogProvider>
          <Toaster />
        </GraphProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
