/**
 * ReviewCardOnDeckQuizMutation レスポンス + クイズ表示用 card のフィクスチャ（colocated・ADR-003）。
 *
 * `deck-quiz.generated.ts` の `ReviewCardOnDeckQuizMutation` / `CardOnDeckQuizFragment` /
 * `DeckOnDeckQuizFragment` 型に合致する最小の決定的データを返す。
 * 同一入力→同一データ。`overrides` で部分上書き可能。
 */
import type {
  CardOnDeckQuizFragment,
  DeckOnDeckQuizFragment,
  ReviewCardOnDeckQuizMutation,
} from './deck-quiz.generated'

/** クイズ表示用の CardOnDeckQuizFragment を生成する。 */
export const mockQuizCard = (
  overrides: Partial<CardOnDeckQuizFragment> = {},
): CardOnDeckQuizFragment => {
  return {
    __typename: 'Card',
    id: 1,
    question: 'Hello World',
    answer: 'こんにちは世界',
    aiAnswer: 'AI generated answer',
    ...overrides,
  }
}

/** DeckOnDeckQuizFragment を生成する。 */
export const mockQuizDeck = (
  overrides: Partial<DeckOnDeckQuizFragment> = {},
): DeckOnDeckQuizFragment => {
  return {
    __typename: 'Deck',
    id: 1,
    ...overrides,
  }
}

/** ReviewCardOnDeckQuizMutation のレスポンス data を生成する。 */
export const mockReviewCardOnDeckQuizMutationData = (
  overrides: { cardId?: number } = {},
): ReviewCardOnDeckQuizMutation => {
  return {
    __typename: 'Mutation',
    reviewCard: {
      __typename: 'ReviewCardOutput',
      cardId: overrides.cardId ?? 1,
    },
  }
}
