import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('複数クラスを結合する', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('falsy 値を除外する', () => {
    expect(cn(false, null, undefined, '', 'a')).toBe('a')
  })

  it('tailwind-merge で競合クラスを後勝ちで解消する', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('競合しないクラスは保持する', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
  })
})
