import * as Sentry from '@sentry/nextjs'

// Sentry通知にユーザー情報を付与する
export const setSentryUser = (
  user:
    | {
        id: string
        email?: string
        username: string
      }
    | undefined,
) => {
  Sentry.setUser(user ?? null)
}

export const captureError = (err: Error, data?: unknown) => {
  Sentry.captureException(err, { data })
}

type LogLevel = 'warning' | 'info' | 'debug'

export const captureLog = (
  level: LogLevel,
  message: string,
  data?:
    | {
        [key: string]: unknown
      }
    | undefined,
) => {
  Sentry.addBreadcrumb({
    level,
    type: 'default',
    category: 'log',
    message,
    data,
  })
}
