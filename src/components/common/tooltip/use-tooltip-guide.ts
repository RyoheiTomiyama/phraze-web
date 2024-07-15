import { useRef, useState } from 'react'

type useTooltipGuideProps = {
  defaultOpen?: boolean
}

export const useTooltipGuide = <RefElement>({
  defaultOpen = false,
}: useTooltipGuideProps) => {
  const [open, setOpen] = useState(defaultOpen)
  const elemetRef = useRef<RefElement>(null)

  return {
    open,
    setOpen,
    elemetRef,
  }
}
