import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  useFloating,
  Placement,
  autoPlacement,
  offset,
} from '@floating-ui/react'
import React, { PropsWithChildren } from 'react'

type TooltipGuideProps = {
  className?: string
  elementRef?: Element | null
  open?: boolean
  placement?: Placement
  onClose?: () => void
}
export const TooltipGuide = ({
  children,
  className,
  elementRef,
  open = false,
  placement,
  onClose,
}: PropsWithChildren<TooltipGuideProps>) => {
  const {
    refs,
    floatingStyles,
    placement: dataPlacement,
  } = useFloating({
    open,
    elements: {
      reference: elementRef,
    },
    placement,
    middleware: [autoPlacement(), offset(8)],
  })

  if (!open) {
    return null
  }

  return (
    <div
      ref={refs.setFloating}
      style={floatingStyles}
      data-placement={dataPlacement}
      className={cn(
        `
        relative flex flex-col gap-2 z-10
        rounded-md border bg-popover text-popover-foregroundoutline-none text-sm min-w-[200px] p-4
        filter drop-shadow-md
        after:top-[50%] after:left-0
        after:content-[''] after:w-3 after:h-3 after:absolute after:bg-background 
        after:transform after:translate-x-[-50%] after:translate-y-[-50%] after:rotate-45 after:origin-center
        data-[placement='top']:after:left-[50%] data-[placement='top']:after:top-full data-[placement='top']:after:border-bottom data-[placement='top']:after:border-right
        data-[placement='bottom']:after:left-[50%] data-[placement='bottom']:after:top-0 data-[placement='bottom']:after:border-top data-[placement='bottom']:after:border-left
        `,
        className,
      )}
    >
      <div>{children}</div>
      <div className="flex flex-col items-end">
        <Button
          size="xs"
          variant="outline"
          className="text-xs"
          onClick={onClose}
        >
          OK
        </Button>
      </div>
    </div>
  )
}
