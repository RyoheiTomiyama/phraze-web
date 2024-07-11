const isDev = process.env.NODE_ENV === 'development'

const debug = (message?: unknown, ...options: unknown[]) => {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.log(message, options)
  }
  // TODO sentry
}

const warn = (message?: unknown, ...options: unknown[]) => {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.warn(message, options)
  }
  // TODO sentry
}

const error = (message?: unknown, ...options: unknown[]) => {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.error(message, options)
  }
  // TODO sentry
}

export const logger = {
  debug,
  warn,
  error,
}
