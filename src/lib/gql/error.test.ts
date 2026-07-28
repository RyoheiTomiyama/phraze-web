import { describe, expect, it, vi, beforeEach } from 'vitest'
import { GraphQLError } from 'graphql/error'
import { CombinedError } from 'urql'
import { logger } from '@/lib/logger'
import { NetworkError, ResponseError, parseGQLError } from './error'

vi.mock('@/lib/logger', () => {
  return {
    logger: {
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    },
  }
})

const InternalErrorMessage = '予期せぬエラーが発生しました。'

describe('NetworkError', () => {
  it('固定のメッセージを持つ', () => {
    const cause = new Error('network down')
    const err = new NetworkError(cause)
    expect(err.message).toBe(
      '通信に失敗しました。ネットワーク状態を確認してください',
    )
  })

  it('cause/name/stack を元エラーから引き継ぐ', () => {
    const cause = new TypeError('boom')
    const err = new NetworkError(cause)
    expect(err.cause).toBe(cause)
    expect(err.name).toBe('TypeError')
  })
})

describe('ResponseError', () => {
  it('extensions.code と clientMessage を code/message に反映する', () => {
    const gql = new GraphQLError('raw', {
      extensions: { code: 404, clientMessage: 'Not Found' } as never,
    })
    const err = new ResponseError([gql])
    expect(err.code).toBe(404)
    expect(err.message).toBe('Not Found')
    expect(err.errors).toEqual([gql])
  })

  it('code 未指定のとき 500 + 内部メッセージになる', () => {
    const gql = new GraphQLError('raw', { extensions: {} as never })
    const err = new ResponseError([gql])
    expect(err.code).toBe(500)
    expect(err.message).toBe(InternalErrorMessage)
    expect(logger.error).toHaveBeenCalled()
  })

  it('code が number でないとき 500 + 内部メッセージになる', () => {
    const gql = new GraphQLError('raw', {
      extensions: { code: 'bad' } as never,
    })
    const err = new ResponseError([gql])
    expect(err.code).toBe(500)
    expect(err.message).toBe(InternalErrorMessage)
  })

  it('clientMessage がないとき内部メッセージになる', () => {
    const gql = new GraphQLError('raw', { extensions: { code: 500 } as never })
    const err = new ResponseError([gql])
    expect(err.code).toBe(500)
    expect(err.message).toBe(InternalErrorMessage)
  })

  it('空配列では throw される', () => {
    expect(() => {
      return new ResponseError([])
    }).toThrow('ClientErrorには1つ以上のGraphQLErrorが必要です')
  })
})

describe('parseGQLError', () => {
  beforeEach(() => {
    vi.mocked(logger.error).mockClear()
  })

  it('networkError を優先して NetworkError にする', () => {
    const gql = new GraphQLError('x')
    const combined = new CombinedError({
      networkError: new Error('net'),
      graphQLErrors: [gql],
    })
    expect(parseGQLError(combined)).toBeInstanceOf(NetworkError)
  })

  it('graphQLErrors のみのとき ResponseError にする', () => {
    const gql = new GraphQLError('x', {
      extensions: { code: 400, clientMessage: 'Bad' } as never,
    })
    const combined = new CombinedError({ graphQLErrors: [gql] })
    const parsed = parseGQLError(combined)
    expect(parsed).toBeInstanceOf(ResponseError)
    expect((parsed as ResponseError).code).toBe(400)
  })

  it('どちらもないとき内部エラーになり logger.error が呼ばれる', () => {
    const combined = new CombinedError({})
    const parsed = parseGQLError(combined)
    expect(parsed).toBeInstanceOf(Error)
    expect(parsed.message).toBe(InternalErrorMessage)
    expect(logger.error).toHaveBeenCalled()
  })

  it('undefined のとき内部エラーになる', () => {
    const parsed = parseGQLError(undefined)
    expect(parsed.message).toBe(InternalErrorMessage)
  })
})
