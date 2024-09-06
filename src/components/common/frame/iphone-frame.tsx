import { cn } from '@/lib/utils'
import { forwardRef, PropsWithChildren, useMemo } from 'react'

// NOTE 428 x 926 の画面を埋め込む

type IphoneFrameProps = {
  innerWidth?: number
  className?: string
}

const defaultInnerWidth = 428
// const defaultInnerHeight = 926
const defaultWidth = 464
const defaultHeight = 962

export const IphoneFrame = forwardRef<
  SVGSVGElement,
  PropsWithChildren<IphoneFrameProps>
>(function IphoneFrame(
  { children, className, innerWidth = 428, ...props },
  ref,
) {
  const {
    width,
    height,
    viewBox,
    top,
    left,
    right,
    bottom,
    round,
    innerRound,
  } = useMemo(() => {
    const scale = innerWidth / defaultInnerWidth
    const width = defaultWidth * scale
    const height = defaultHeight * scale

    const padding = ((defaultWidth - defaultInnerWidth) / 2) * scale
    const round = 74 * scale
    const innerRound = 55 * scale

    return {
      width: `${width}`,
      height: `${height}`,
      viewBox: `0 0 ${defaultWidth} ${defaultHeight}`,
      top: padding,
      left: padding,
      right: padding,
      bottom: padding,
      round,
      innerRound,
    }
  }, [innerWidth])

  return (
    <div
      className={cn('w-fit h-fit', className)}
      style={{ borderRadius: `${round}px` }}
    >
      <div
        className="relative w-fit h-fit overflow-hidden"
        style={{ borderRadius: `${round}px` }}
      >
        <svg
          width={width}
          height={height}
          viewBox={viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          ref={ref}
          {...props}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 118.4C0 76.9561 0 56.2342 8.06552 40.4047C15.1601 26.4807 26.4807 15.1601 40.4047 8.06552C56.2342 0 76.9561 0 118.4 0H345.6C387.044 0 407.766 0 423.595 8.06552C437.519 15.1601 448.84 26.4807 455.934 40.4047C464 56.2342 464 76.9561 464 118.4V843.6C464 885.044 464 905.766 455.934 921.595C448.84 935.519 437.519 946.84 423.595 953.935C407.766 962 387.044 962 345.6 962H118.4C76.9561 962 56.2342 962 40.4047 953.935C26.4807 946.84 15.1601 935.519 8.06552 921.595C0 905.766 0 885.044 0 843.6V118.4ZM18 106C18 75.1971 18 59.7957 23.9946 48.0305C29.2677 37.6816 37.6816 29.2677 48.0305 23.9946C59.7957 18 75.1971 18 106 18H146L146.417 18.1788C147.238 18.5304 147.996 18.9972 148.671 19.5601C150.58 21.1501 151 23.7932 151 26.2771V28C151 41.2548 161.745 52 175 52H289C302.255 52 313 41.2548 313 28V26.2771C313 23.7932 313.42 21.1501 315.329 19.5601C316.004 18.9972 316.762 18.5304 317.583 18.1788L318 18H358C388.803 18 404.204 18 415.969 23.9946C426.318 29.2677 434.732 37.6816 440.005 48.0305C446 59.7957 446 75.1971 446 106V856C446 886.803 446 902.204 440.005 913.969C434.732 924.318 426.318 932.732 415.969 938.005C404.204 944 388.803 944 358 944H106C75.1971 944 59.7957 944 48.0305 938.005C37.6816 932.732 29.2677 924.318 23.9946 913.969C18 902.204 18 886.803 18 856V106Z"
            fill="#181A22"
          />
        </svg>

        <div
          className="absolute overflow-hidden -z-10"
          style={{
            top,
            left,
            right,
            bottom,
            borderRadius: `${innerRound}px`,
            overflow: 'hidden',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
})
