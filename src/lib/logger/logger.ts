import util from 'util'
import { captureError, captureLog } from '../sentry'

const isDev = process.env.NODE_ENV === 'development'

const debug = (message?: unknown, ...options: unknown[]) => {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.log(message, ...options)
  }

  const str = util.format(message, ...options)
  captureLog('debug', str, { arguments: [message, ...options] })
}

const info = (message?: unknown, ...options: unknown[]) => {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.info(message, ...options)
  }

  const str = util.format(message, ...options)
  captureLog('info', str, { arguments: [message, ...options] })
}

const warn = (message?: unknown, ...options: unknown[]) => {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.warn(message, ...options)
  }

  const str = util.format(message, ...options)
  captureLog('warning', str, { arguments: [message, ...options] })
}

const error = (message?: unknown, ...options: unknown[]) => {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.error(message, ...options)
  }

  const str = util.format(message, ...options)
  captureError(new Error(str), { arguments: [message, ...options] })
}

export const logger = {
  debug,
  info,
  warn,
  error,
}
