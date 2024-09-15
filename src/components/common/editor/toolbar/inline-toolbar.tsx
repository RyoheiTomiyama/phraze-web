import { PropsWithChildren, useMemo } from 'react'
import { useInlineToolbar } from './use-inline-toolbar'

export const InlineToolbar = ({ children }: PropsWithChildren) => {
  const { open, floatingStyles, placement, refs } = useInlineToolbar()

  const side = useMemo(() => {
    const match = placement.match(/(top|bottom|right|left)/)
    return match?.[0] ?? 'bottom'
  }, [placement])

  return (
    <div
      ref={refs.setFloating}
      style={floatingStyles}
      className={!open ? 'hidden' : ''}
    >
      <div
        data-state={open ? 'open' : 'closed'}
        data-side={side}
        className={`
            rounded-md border bg-popover text-popover-foreground shadow-md outline-none 
            transition
            data-[state=open]:opacity-100 data-[state=open]:translate-x-0 data-[state=open]:translate-y-0
            data-[state=closed]:opacity-0 
            data-[side=top]:-translate-y-2
            data-[side=bottom]:translate-y-2
            data-[side=left]:translate-x-2
            data-[side=right]:-translate-x-2
        `}
      >
        {children}
      </div>
    </div>
  )
}
