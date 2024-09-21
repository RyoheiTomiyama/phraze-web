import Head from 'next/head'
import React from 'react'

export const FaviconMeta = () => {
  return (
    <Head>
      <link rel="icon" href="/icons/favicon.ico" />
      <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/apple-touch-icon.png"
      />
      <link rel="manifest" href="/icons/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/icons/safari-pinned-tab.svg"
        color="#09090b"
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  )
}
