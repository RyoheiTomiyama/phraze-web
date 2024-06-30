import { useCallback, useEffect, useRef } from 'react'

export default function useMountedState(): () => boolean {
  const mountedRef = useRef<boolean>(false)
  const get = useCallback(() => {
    return mountedRef.current
  }, [])

  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
    }
  }, [])

  return get
}
