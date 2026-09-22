import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
/**
 * DeckQuiz コンポーネントテスト（Phase 3・ADR-004）。
 *
 * `useReviewCardOnDeckQuizMutation` で grade 1/3/5 を送信する挙動と、TTS
 * （useTextToSpeech）・zustand（useLearningOption）との複合を `@/lib/urql/client.mock`
 * のモッククライアント基盤 + 既存 Web Speech グローバルモックでカバーする。
 * レンダーは標準の wrapper パターン（v5）: `render(ui, { wrapper })`。mutation の
 * spy 検証は `createTestClient` を事前構築して `createUrqlWrapper(client)` に渡す。
 *
 * Lexical エディタ（QuizCard 配下の QuestionViewer / AnswerViewer）は jsdom で
 * 安定描画できないため、`./quiz-card` をプレーン表示に置換する（DeckQuiz 本体の
 * mutation/TTS/zustand ロジックには影響しない・描画葉のみ差し替え）。
 * 既存の deck-quiz-empty/completed/progress/quiz-action テスト（子コンポーネント単体）
 * とは重複せず、DeckQuiz 本体の mutation フローを中心にカバーする。
 */
import { LearningOptionProvider } from '@/components/feature/setting'
import { DeckQuiz } from './deck-quiz'
import {
  mockQuizCard,
  mockQuizDeck,
  mockReviewCardOnDeckQuizMutationData,
} from './deck-quiz.fixture'
import {
  createTestClient,
  createUrqlWrapper,
  fail,
  ok,
} from '@/lib/urql/client.mock'

// Lexical（QuizCard 配下の Viewer 群）をプレーン表示に置換。
vi.mock('./quiz-card', async () => {
  const { createElement } = await import('react')
  return {
    QuizCard: ({ card }: { card: { question: string } }) => {
      return createElement('div', { 'data-testid': 'quiz-card' }, card.question)
    },
  }
})

// sonner の toast は外部 SDK 依存のためスタブ化（card-add.test.tsx と同方針）。
vi.mock('sonner', () => {
  return {
    toast: {
      error: vi.fn(),
      success: vi.fn(),
      warning: vi.fn(),
    },
  }
})

import { toast } from 'sonner'

const PERSIST_KEY = 'phraze-learning-option'

describe('DeckQuiz', () => {
  beforeEach(() => {
    // zustand persist の永続化状態をテスト間で isolation reset（ADR-003・局所データ）
    localStorage.removeItem(PERSIST_KEY)
    vi.mocked(toast.error).mockReset()
    vi.mocked(toast.success).mockReset()
    vi.mocked(toast.warning).mockReset()
  })

  const deck = mockQuizDeck({ id: 7 })
  const card1 = mockQuizCard({ id: 101, question: 'first phrase' })
  const card2 = mockQuizCard({ id: 102, question: 'second phrase' })

  it('Show Answer → Easy(grade 5) で reviewCard mutation が送信され次カードへ進む（happy-path）', async () => {
    const user = userEvent.setup()
    const client = createTestClient({
      ReviewCardOnDeckQuiz: ok(
        mockReviewCardOnDeckQuizMutationData({ cardId: 101 }),
      ),
    })
    render(
      <LearningOptionProvider>
        <DeckQuiz cards={[card1, card2]} deck={deck} />
      </LearningOptionProvider>,
      { wrapper: createUrqlWrapper(client) },
    )

    await user.click(screen.getByRole('button', { name: 'Show Answer' }))
    await user.click(screen.getByRole('button', { name: 'Easy' }))

    await waitFor(() => {
      expect(client.executeMutation).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: { input: { cardId: 101, grade: 5 } },
        }),
        expect.anything(),
      )
    })

    // 次カード（card2）へ進む
    await waitFor(() => {
      expect(screen.getByTestId('quiz-card')).toHaveTextContent('second phrase')
    })
  })

  it('mutation error 時は toast.error が呼ばれる（edge: error）', async () => {
    const user = userEvent.setup()
    render(
      <LearningOptionProvider>
        <DeckQuiz cards={[card1]} deck={deck} />
      </LearningOptionProvider>,
      {
        wrapper: createUrqlWrapper({
          ReviewCardOnDeckQuiz: fail(new Error('mutation failed')),
        }),
      },
    )

    await user.click(screen.getByRole('button', { name: 'Show Answer' }))
    await user.click(screen.getByRole('button', { name: 'Easy' }))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        '通信に失敗しました。ネットワーク状態を確認してください',
      )
    })
  })

  it('最後のカードで Again(grade 1) 送信後、完了画面に遷移する（edge: grade 1 + 完了遷移）', async () => {
    const user = userEvent.setup()
    const client = createTestClient({
      ReviewCardOnDeckQuiz: ok(
        mockReviewCardOnDeckQuizMutationData({ cardId: 101 }),
      ),
    })
    render(
      <LearningOptionProvider>
        <DeckQuiz cards={[card1]} deck={deck} />
      </LearningOptionProvider>,
      { wrapper: createUrqlWrapper(client) },
    )

    await user.click(screen.getByRole('button', { name: 'Show Answer' }))
    await user.click(screen.getByRole('button', { name: 'Again' }))

    await waitFor(() => {
      expect(client.executeMutation).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: { input: { cardId: 101, grade: 1 } },
        }),
        expect.anything(),
      )
    })

    // card 尽 → DeckQuizCompleted
    await waitFor(() => {
      expect(
        screen.getByText('All cards are already completed!'),
      ).toBeInTheDocument()
    })
  })

  it('autoPlay=true のとき次カードへ進むと TTS が発話する（edge: TTS + zustand 複合）', async () => {
    // zustand persist に autoPlay=true を事前設定し、store の rehydrate で反映
    localStorage.setItem(
      PERSIST_KEY,
      JSON.stringify({
        state: { autoPlay: true, voiceOnly: false, voiceURI: undefined },
        version: 0,
      }),
    )
    const speakSpy = vi.spyOn(window.speechSynthesis, 'speak')

    const user = userEvent.setup()
    render(
      <LearningOptionProvider>
        <DeckQuiz cards={[card1, card2]} deck={deck} />
      </LearningOptionProvider>,
      {
        wrapper: createUrqlWrapper({
          ReviewCardOnDeckQuiz: ok(
            mockReviewCardOnDeckQuizMutationData({ cardId: 101 }),
          ),
        }),
      },
    )

    await user.click(screen.getByRole('button', { name: 'Show Answer' }))
    await user.click(screen.getByRole('button', { name: 'Easy' }))

    // 次カード(card2)へ進んだとき handleChange → speak が呼ばれる
    await waitFor(() => {
      expect(speakSpy).toHaveBeenCalledWith(
        expect.objectContaining({ text: 'second phrase' }),
      )
    })
  })
})
