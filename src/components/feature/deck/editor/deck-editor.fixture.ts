/**
 * GetCardOnDeckEditorQuery レスポンスのフィクスチャ（colocated・ADR-003）。
 *
 * `deck-editor.generated.ts` の `GetCardOnDeckEditorQuery` 型に合致する最小の決定的データを返す。
 * 同一入力→同一データ。`overrides` で部分上書き可能。
 */
import type { GetCardOnDeckEditorQuery } from './deck-editor.generated'

/** GetCardOnDeckEditor の card 部分の型（生成型から抽出）。 */
type CardOnDeckEditorQueryCard = NonNullable<GetCardOnDeckEditorQuery['card']>

/**
 * GetCardOnDeckEditorQuery の card 用フィクスチャを生成する。
 * デフォルトは aiAnswer あり（ポーリング停止条件を満たす）・createdAt は現在時刻。
 */
export const mockCard = (
  overrides: Partial<CardOnDeckEditorQueryCard> = {},
): CardOnDeckEditorQueryCard => {
  return {
    __typename: 'Card',
    id: 1,
    createdAt: new Date().toISOString(),
    question: 'Hello World',
    answer: 'こんにちは世界',
    aiAnswer: 'AI generated answer',
    ...overrides,
  }
}

/** GetCardOnDeckEditorQuery のレスポンス data 全体を生成する。 */
export const mockGetCardOnDeckEditorQueryData = (
  overrides: { card?: CardOnDeckEditorQueryCard | null } = {},
): GetCardOnDeckEditorQuery => {
  const card = overrides.card === undefined ? mockCard() : overrides.card
  if (card === null) {
    // 生成型は card を非 null として型付けするが、実行時には不在で null になり得る
    // （cardId 該当なし）。そのためクエリ型へ明示キャストする。
    return {
      __typename: 'Query',
      card: null,
    } as unknown as GetCardOnDeckEditorQuery
  }
  return { __typename: 'Query', card }
}
