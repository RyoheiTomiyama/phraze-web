import { forwardRef } from 'react'
import { IconProps } from './icon'

export const Ai = forwardRef<SVGSVGElement, IconProps>(function Ai(
  {
    color = 'currentColor',
    size = 24,
    strokeWidth = 0,
    className = '',
    ...rest
  },
  ref,
) {
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      strokeWidth={strokeWidth}
      className={className}
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.47975 11.4797L9.02569 6.84189H9.97437L11.5203 11.4797L16.1581 13.0257V13.9743L11.5203 15.5203L9.97437 20.1581H9.02569L7.47975 15.5203L2.84192 13.9743V13.0257L7.47975 11.4797Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.2297 5.22972L17.0257 2.84189H17.9744L18.7703 5.22972L21.1581 6.02566V6.97434L18.7703 7.77029L17.9744 10.1581H17.0257L16.2297 7.77029L13.8419 6.97434V6.02566L16.2297 5.22972Z"
      />
    </svg>
  )
})
