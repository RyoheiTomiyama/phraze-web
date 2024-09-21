import { DialogProvider } from '@/components/common/dialog'
import { MediaQueryProvider } from '@/components/common/media-query'
import { FaviconMeta } from '@/components/common/meta'
import { ThemeProvider } from '@/components/common/theme'
import { AuthProvider } from '@/components/feature/auth'
import { GraphProvider } from '@/components/feature/graph'
import { Toaster } from '@/components/ui/sonner'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <FaviconMeta />
      <ThemeProvider defaultTheme="system">
        <MediaQueryProvider>
          <AuthProvider>
            <GraphProvider>
              <DialogProvider>
                <Component {...pageProps} />
              </DialogProvider>
              <Toaster />
            </GraphProvider>
          </AuthProvider>
        </MediaQueryProvider>
      </ThemeProvider>
    </>
  )
}
