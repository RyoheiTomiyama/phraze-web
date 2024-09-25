import { logger } from '@/lib/logger'
import { clientSchema } from './schema'

const parsed = clientSchema.safeParse({})

// 検証に失敗した場合はビルドエラーにする
if (!parsed.success) {
  logger.error(
    'Failed parse client env',
    JSON.stringify(parsed.error.format(), null, 4),
  )
  process.exit(1)
}

export const clientEnv = parsed.data
