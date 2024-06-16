import { PropsWithChildren } from 'react'

export const DeckLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col min-h-screen gap-4 py-4">{children}</div>
    </div>
  )
}
