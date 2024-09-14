import {
  BrowserFrame,
  IphoneBrowserFrame,
  IphoneFrame,
} from '@/components/common/frame'
import { useAuthContext } from '@/components/feature/auth'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { pagesPath, staticPath } from '@/lib/pathpida/$path'
import { CircleUser } from 'lucide-react'
import Link from 'next/link'

export const Home = () => {
  const { isLogin } = useAuthContext()
  return (
    <>
      <header className="flex flex-row items-center justify-between px-6 py-4">
        <div className="text-4xl font-bold">Phraze</div>
        <div className="flex gap-4">
          {isLogin ? (
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link href={pagesPath.dashboard.$url()}>
                  <CircleUser className="h-7 w-7" />
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href={pagesPath.signin.$url()}>Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href={pagesPath.signin.$url()}>Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </header>
      <main>
        <section className="flex flex-col sm:flex-row gap-16 sm:gap-0 px-6 py-6">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex flex-col gap-8 items-start">
              <Heading
                variant="h1"
                className="text-4xl md:text-5xl leading-normal"
              >
                <span className="text-2xl md:text-3xl">反復学習に特化した</span>
                <br />
                英語学習アプリ
              </Heading>
              <Button size="lg" className="rounded-full" asChild>
                <Link href={pagesPath.signin.$url()}>Get Started</Link>
              </Button>
            </div>
          </div>
          <div className="flex-auto md:flex-1 relative h-[420px] sm:h-[420px] md:h-[600px]">
            <BrowserFrame
              innerWidth={1280 * 0.6}
              innerHeight={800 * 0.6}
              className="shadow-2xl absolute top-0 origin-top-left 
               scale-75 left-20
               sm:scale-75 sm:left-32
               md:scale-100 md:left-10"
            >
              <video autoPlay loop muted={true}>
                <source src={staticPath.videos.hero_browser_mp4} />
              </video>
            </BrowserFrame>
            <IphoneFrame
              innerWidth={160}
              className="shadow-2xl absolute z-0 bottom-0 left-0"
            >
              <IphoneBrowserFrame innerWidth={160}>
                <video autoPlay loop muted={true}>
                  <source src={staticPath.videos.hero_mobile_mp4} />
                </video>
              </IphoneBrowserFrame>
            </IphoneFrame>
          </div>
        </section>
      </main>
    </>
  )
}
