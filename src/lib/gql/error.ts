import { GraphQLError } from 'graphql/error'
import { CombinedError } from 'urql'
import { logger } from '@/lib/logger'

const InternalErrorMessage = '予期せぬエラーが発生しました。'

declare module 'graphql/error' {
  interface GraphQLErrorExtensions {
    code?: number
    clientMessage?: string
  }
}

export class NetworkError extends Error {
  constructor(err: Error) {
    super('通信に失敗しました。ネットワーク状態を確認してください')

    this.cause = err
    this.name = err.name
    this.stack = err.stack
  }
}

export class ResponseError extends Error {
  public code: number
  public errors: GraphQLError[]

  constructor(errors: GraphQLError[]) {
    const e = errors[0]
    if (!e) {
      throw Error('ClientErrorには1つ以上のGraphQLErrorが必要です')
    }
    super(e.message)

    this.errors = errors
    this.cause = e

    if (!e.extensions.code || typeof e.extensions.code !== 'number') {
      logger.error('serverから想定外のエラーが返却されています', e)
      this.code = 500
      this.message = InternalErrorMessage
    } else {
      this.code = e.extensions.code || 500
      this.message = e.extensions.clientMessage || InternalErrorMessage
    }
  }
}

/** GraphQLから受け取ったエラーをいい感じの型に変換する */
export const parseGQLError = (error?: CombinedError) => {
  if (error?.networkError) {
    return new NetworkError(error.networkError)
  }
  if (error?.graphQLErrors.length) {
    return new ResponseError(error.graphQLErrors)
  }
  logger.error('parseGQLError例外が発生', error)
  return new Error(InternalErrorMessage)
}
