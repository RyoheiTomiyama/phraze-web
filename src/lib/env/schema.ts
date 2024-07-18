import { z } from 'zod'

/**
 * クライアント側で使う環境変数のスキーマを定義
 * クライアント側に公開するには、`NEXT_PUBLIC_` プレフィックスをつける
 */
export const clientSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  NEXT_PUBLIC_GRAPH_API_URL: z
    .string()
    .url()
    .default('http://localhost:8080/query'),
})
