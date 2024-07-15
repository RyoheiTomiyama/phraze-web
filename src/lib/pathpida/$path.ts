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
        $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/deck/[id]/edit' as const, query: { id }, hash: url?.hash })
      },
      $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/deck/[id]' as const, query: { id }, hash: url?.hash })
    })
  },
  $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/' as const, hash: url?.hash })
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  favicon_ico: '/favicon.ico',
  next_svg: '/next.svg',
  vercel_svg: '/vercel.svg'
} as const;

export type StaticPath = typeof staticPath;
