import { describe, expect, it } from 'vitest'
import { renderHook } from '@testing-library/react'
import useMountedState from '.'

describe('useMountedState', () => {
  it('mount 後は true を返す', () => {
    const { result } = renderHook(() => {
      return useMountedState()
    })
    expect(result.current()).toBe(true)
  })

  it('unmount 後は false を返す', () => {
    const { result, unmount } = renderHook(() => {
      return useMountedState()
    })
    expect(result.current()).toBe(true)
    unmount()
    expect(result.current()).toBe(false)
  })

  it('複数回呼び出しても同じ判定を返す', () => {
    const { result } = renderHook(() => {
      return useMountedState()
    })
    expect(result.current()).toBe(true)
    expect(result.current()).toBe(true)
  })
})
