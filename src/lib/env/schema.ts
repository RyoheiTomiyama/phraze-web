import { z } from 'zod'

/**
 * クライアント側で使う環境変数のスキーマを定義
 * クライアント側に公開するには、`NEXT_PUBLIC_` プレフィックスをつける
 */
export const clientSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default(process.env.NODE_ENV),
  NEXT_PUBLIC_GRAPH_API_URL: z
    .url()
    .default(
      process.env.NEXT_PUBLIC_GRAPH_API_URL || 'http://localhost:8080/query',
    ),
  NEXT_PUBLIC_FIREBASE_API_KEY: z
    .string()
    .default(process.env.NEXT_PUBLIC_FIREBASE_API_KEY || ''),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z
    .string()
    .default(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || ''),
  NEXT_PUBLIC_FIREBASE_SENDER_ID: z
    .string()
    .default(process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID || ''),
  NEXT_PUBLIC_FIREBASE_APP_ID: z
    .string()
    .default(process.env.NEXT_PUBLIC_FIREBASE_APP_ID || ''),
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z
    .string()
    .default(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || ''),
})
