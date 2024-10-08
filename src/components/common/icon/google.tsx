import { forwardRef } from 'react'
import { IconProps } from './icon'

export const Google = forwardRef<SVGSVGElement, IconProps>(function Google(
  { size = 24, className = '', ...rest },
  ref,
) {
  return (
    <svg
      ref={ref}
      width="20"
      height="20"
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      {...rest}
    >
      <mask
        id="mask0_76_70"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <path d="M20 0H0V20H20V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_76_70)">
        <path
          d="M19.6 10.2273C19.6 9.5182 19.5364 8.8364 19.4182 8.1818H10V12.05H15.3818C15.15 13.3 14.4455 14.3591 13.3864 15.0682V17.5773H16.6182C18.5091 15.8364 19.6 13.2727 19.6 10.2273Z"
          fill="#4285F4"
        />
        <path
          d="M9.99988 20C12.6999 20 14.9635 19.1045 16.618 17.5773L13.3862 15.0682C12.4908 15.6682 11.3453 16.0227 9.99988 16.0227C7.39528 16.0227 5.19078 14.2636 4.40438 11.9H1.06348V14.4909C2.70898 17.7591 6.09078 20 9.99988 20Z"
          fill="#34A853"
        />
        <path
          d="M4.4045 11.9C4.2045 11.3 4.0909 10.6591 4.0909 10C4.0909 9.3409 4.2045 8.7 4.4045 8.1V5.5091H1.0636C0.3864 6.8591 0 8.3864 0 10C0 11.6136 0.3864 13.1409 1.0636 14.4909L4.4045 11.9Z"
          fill="#FBBC04"
        />
        <path
          d="M9.99988 3.9773C11.468 3.9773 12.7862 4.4818 13.8226 5.4727L16.6908 2.6045C14.959 0.9909 12.6953 0 9.99988 0C6.09078 0 2.70898 2.2409 1.06348 5.5091L4.40438 8.1C5.19078 5.7364 7.39528 3.9773 9.99988 3.9773Z"
          fill="#E94235"
        />
      </g>
    </svg>
  )
})
