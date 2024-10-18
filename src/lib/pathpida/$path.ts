import type { OptionalQuery as OptionalQuery_49gqgz } from '../../pages/deck/[id]/admin';
import type { OptionalQuery as OptionalQuery_1dmjqw } from '../../pages/deck/[id]/edit';

export const pagesPath = {
  "$404": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/404' as const, hash: url?.hash })
  },
  "dashboard": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/dashboard' as const, hash: url?.hash })
  },
  "deck": {
    _id: (id: string | number) => ({
      "admin": {
        $url: (url?: { query?: OptionalQuery_49gqgz | undefined, hash?: string | undefined } | undefined) => ({ pathname: '/deck/[id]/admin' as const, query: { id, ...url?.query }, hash: url?.hash })
      },
      "edit": {
        $url: (url?: { query?: OptionalQuery_1dmjqw | undefined, hash?: string | undefined } | undefined) => ({ pathname: '/deck/[id]/edit' as const, query: { id, ...url?.query }, hash: url?.hash })
      },
      $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/deck/[id]' as const, query: { id }, hash: url?.hash })
    })
  },
  "signin": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/signin' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/' as const, hash: url?.hash })
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  favicon_ico: '/favicon.ico',
  icons: {
    android_chrome_192x192_png: '/icons/android-chrome-192x192.png',
    android_chrome_512x512_png: '/icons/android-chrome-512x512.png',
    apple_touch_icon_png: '/icons/apple-touch-icon.png',
    browserconfig_xml: '/icons/browserconfig.xml',
    favicon_ico: '/icons/favicon.ico',
    favicon_svg: '/icons/favicon.svg',
    mstile_150x150_png: '/icons/mstile-150x150.png',
    safari_pinned_tab_svg: '/icons/safari-pinned-tab.svg',
    site_webmanifest: '/icons/site.webmanifest'
  },
  videos: {
    hero_browser_mp4: '/videos/hero-browser.mp4',
    hero_mobile_mp4: '/videos/hero-mobile.mp4'
  }
} as const;

export type StaticPath = typeof staticPath;
