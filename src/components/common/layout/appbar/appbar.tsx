import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

type AppbarProps = {
  className?: string
}

export const Appbar = ({
  className,
  children,
}: PropsWithChildren<AppbarProps>) => {
  return (
    <div
      className={cn(
        'flex flex-col px-6 min-h-10 justify-center gap-4',
        className,
      )}
    >
      {children}
    </div>
  )
}
