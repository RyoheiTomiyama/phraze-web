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
  next_svg: '/next.svg',
  vercel_svg: '/vercel.svg',
  videos: {
    hero_browser_mp4: '/videos/hero-browser.mp4',
    hero_mobile_mp4: '/videos/hero-mobile.mp4'
  }
} as const;

export type StaticPath = typeof staticPath;
