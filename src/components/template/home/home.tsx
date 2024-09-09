import {
  BrowserFrame,
  IphoneBrowserFrame,
  IphoneFrame,
} from '@/components/common/frame'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { staticPath } from '@/lib/pathpida/$path'

export const Home = () => {
  return (
    <>
      <header className="flex flex-row items-center justify-between px-6 py-4">
        <div className="text-4xl font-bold">Phraze</div>
        <div className="flex gap-4">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
          <Button size="sm">Sign Up</Button>
        </div>
      </header>
      <main>
        <section className="flex flex-row h-[600px] container overflow-hidden">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex flex-col gap-8 items-start">
              <Heading variant="h1" className="text-5xl leading-normal">
                <span className="text-3xl">反復学習に特化した</span>
                <br />
                英語学習アプリ
              </Heading>
              <Button size="lg" className="rounded-full">
                Get Started
              </Button>
            </div>
          </div>
          <div className="flex-1 relative">
            <BrowserFrame
              innerWidth={1280 * 0.6}
              innerHeight={800 * 0.6}
              className="shadow-2xl absolute left-10 top-0"
            >
              <video autoPlay loop muted={true}>
                <source src={staticPath.videos.hero_browser_mp4} />
              </video>
            </BrowserFrame>
            <IphoneFrame
              innerWidth={160}
              className="shadow-2xl absolute z-0 bottom-0"
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
