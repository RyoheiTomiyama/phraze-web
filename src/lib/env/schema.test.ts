import { describe, expect, it } from 'vitest'
import { clientSchema } from './schema'

describe('clientSchema', () => {
  it('空入力でデフォルト値が補完される', () => {
    const parsed = clientSchema.safeParse({})
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.data.NODE_ENV).toBe(process.env.NODE_ENV)
      expect(parsed.data.NEXT_PUBLIC_GRAPH_API_URL).toBe(
        'http://localhost:8080/query',
      )
      expect(parsed.data.NEXT_PUBLIC_FIREBASE_API_KEY).toBe('')
      expect(parsed.data.NEXT_PUBLIC_FIREBASE_PROJECT_ID).toBe('')
    }
  })

  it('NODE_ENV に test が許容される', () => {
    const parsed = clientSchema.safeParse({ NODE_ENV: 'test' })
    expect(parsed.success).toBe(true)
  })

  it('NODE_ENV の不正値を弾く', () => {
    const parsed = clientSchema.safeParse({ NODE_ENV: 'invalid' })
    expect(parsed.success).toBe(false)
  })

  it('NEXT_PUBLIC_GRAPH_API_URL の不正 URL を弾く', () => {
    const parsed = clientSchema.safeParse({
      NEXT_PUBLIC_GRAPH_API_URL: 'not-a-url',
    })
    expect(parsed.success).toBe(false)
  })

  it('有効な URL は通る', () => {
    const parsed = clientSchema.safeParse({
      NEXT_PUBLIC_GRAPH_API_URL: 'https://example.com/graphql',
    })
    expect(parsed.success).toBe(true)
    if (parsed.success) {
      expect(parsed.data.NEXT_PUBLIC_GRAPH_API_URL).toBe(
        'https://example.com/graphql',
      )
    }
  })
})
