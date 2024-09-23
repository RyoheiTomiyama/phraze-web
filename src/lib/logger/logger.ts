import util from 'util'
import { captureError, captureLog } from '../sentry'

const isDev = process.env.NODE_ENV === 'development'

const debug = (message?: unknown, ...options: unknown[]) => {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.log(message, ...options)
  }

  const str = util.format(message, ...options)
  captureLog('debug', str)
}

const info = (message?: unknown, ...options: unknown[]) => {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.info(message, ...options)
  }

  const str = util.format(message, ...options)
  captureLog('info', str)
}

const warn = (message?: unknown, ...options: unknown[]) => {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.warn(message, ...options)
  }

  const str = util.format(message, ...options)
  captureLog('warning', str)
}

const error = (message?: unknown, ...options: unknown[]) => {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.error(message, ...options)
  }

  const str = util.format(message, ...options)
  captureError(new Error(str))
}

export const logger = {
  debug,
  info,
  warn,
  error,
}
