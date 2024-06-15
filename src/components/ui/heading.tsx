import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { HTMLAttributes, PropsWithChildren } from 'react'

const headingVariants = cva('break-all', {
  variants: {
    variant: {
      h1: 'text-4xl font-extrabold tracking-tight',
      h2: 'text-3xl font-semibold tracking-tight',
      h3: 'text-2xl font-semibold tracking-tight',
    },
  },
})

export const Heading = ({
  variant,
  className,
  ...props
}: PropsWithChildren<
  HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof headingVariants>
>) => {
  const Component = variant ?? 'h1'
  return (
    <Component
      {...props}
      className={cn(headingVariants({ variant }), className)}
    >
      heading
    </Component>
  )
}
