import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest'
import { add, formatDateTime, formatDistanceToNowStrict } from './date-fns'

describe('add', () => {
  it('日付に期間を加算する', () => {
    const base = new Date('2024-01-01T00:00:00')
    expect(add(base, { days: 1 })).toEqual(new Date('2024-01-02T00:00:00'))
  })

  it('複数単位を同時に加算する', () => {
    const base = new Date('2024-01-01T00:00:00')
    expect(add(base, { months: 1, hours: 2, minutes: 30 })).toEqual(
      new Date('2024-02-01T02:30:00'),
    )
  })

  it('元の Date を破壊しない（参照不一致）', () => {
    const base = new Date('2024-01-01T00:00:00')
    const result = add(base, { days: 1 })
    expect(result).not.toBe(base)
    expect(base).toEqual(new Date('2024-01-01T00:00:00'))
  })
})

describe('formatDateTime', () => {
  it('yyyy-MM-dd HH:mm 形式でフォーマットする', () => {
    expect(formatDateTime(new Date('2024-01-15T09:30:00'))).toBe(
      '2024-01-15 09:30',
    )
  })

  it('文字列の日付も受け取れる', () => {
    expect(formatDateTime('2024-12-31T23:59:00')).toBe('2024-12-31 23:59')
  })
})

describe('formatDistanceToNowStrict', () => {
  beforeAll(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-01T00:05:00'))
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  afterEach(() => {
    vi.setSystemTime(new Date('2024-01-01T00:05:00'))
  })

  it('現在時刻からの厳密な差分を接尾辞付きで返す', () => {
    expect(formatDistanceToNowStrict(new Date('2024-01-01T00:00:00'))).toBe(
      '5 minutes ago',
    )
  })

  it('未来日の場合は "in ..." 表記になる', () => {
    expect(formatDistanceToNowStrict(new Date('2024-01-01T00:10:00'))).toBe(
      'in 5 minutes',
    )
  })
})
