import { describe, expect, it, vi } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { SWRConfig } from 'swr'
import { PropsWithChildren } from 'react'
/**
 * DeckEditor コンポーネントテスト（Phase 3・ADR-004）。
 *
 * `useGetCardOnDeckEditorQuery`（pause + SWR polling）経由で選択中カード1件を
 * 取得・表示する挙動を、`@/lib/urql/client.mock` のモッククライアント基盤経由で
 * カバーする。exchange パイプラインは通さず、mock-the-client 方式（ADR-001）で
 * 本物の codegen 生成フック → client.executeQuery の境界を exercising する。
 * レンダーは標準の wrapper パターン（v5）: `render(ui, { wrapper })`。
 *
 * Lexical エディタ（PhraseInput / AnswerInput）は jsdom で安定して描画できないため、
 * 既存の card-add.test.tsx と同じくプレーン input へ置換する（チーム慣行）。
 * DeckEditor 本体・query/pause/polling ロジックは実物のまま。
 */
import { DeckEditor } from './deck-editor'
import {
  mockCard,
  mockGetCardOnDeckEditorQueryData,
} from './deck-editor.fixture'
import {
  createTestClient,
  createUrqlWrapper,
  fail,
  ok,
  type OperationHandlers,
  type TestClient,
} from '@/lib/urql/client.mock'

// Lexical（PhraseInput / AnswerInput）をプレーン input に置換。
// jsdom では contentEditable / getComputedStyle の制約で Lexical が安定動作しないため。
// DeckEditor の query/pause/polling ロジックには影響しない（描画葉のみ差し替え）。
vi.mock('./phrase-input', async () => {
  const { createElement } = await import('react')
  return {
    PhraseInput: (props: {
      defaultValue?: string
      disabled?: boolean
      'data-testid'?: string
    }) => {
      return createElement('input', {
        type: 'text',
        'data-testid': 'phrase-input',
        defaultValue: props.defaultValue,
        disabled: props.disabled,
      })
    },
  }
})

vi.mock('./answer-input', async () => {
  const { createElement } = await import('react')
  return {
    AnswerInput: (props: {
      defaultValue?: string
      disabled?: boolean
      'data-testid'?: string
    }) => {
      return createElement('input', {
        type: 'text',
        'data-testid': 'answer-input',
        defaultValue: props.defaultValue,
        disabled: props.disabled,
      })
    },
  }
})

// SWR キャッシュ隔離 + urql wrapper を合成した test-local wrapper
// （SWR キャッシュはテスト間で共有されるため provider を Map に隔離・v4 から維持）。
const composeEditorWrapper = (input: OperationHandlers | TestClient) => {
  const UrqlWrapper = createUrqlWrapper(input)
  const EditorWrapper = ({ children }: PropsWithChildren) => {
    return (
      <SWRConfig
        value={{
          provider: () => {
            return new Map()
          },
        }}
      >
        <UrqlWrapper>{children}</UrqlWrapper>
      </SWRConfig>
    )
  }
  return EditorWrapper
}

describe('DeckEditor', () => {
  it('cardId 指定時に GetCardOnDeckEditor を取得し card 編集パネルを表示する（happy-path）', async () => {
    const card = mockCard({
      id: 1,
      question: 'fetch query phrase',
      answer: '取得した答え',
      aiAnswer: 'AI answer',
    })
    const client = createTestClient({
      GetCardOnDeckEditor: ok(mockGetCardOnDeckEditorQueryData({ card })),
    })
    render(<DeckEditor cards={[]} cardId={1} deckId={1} />, {
      wrapper: composeEditorWrapper(client),
    })

    // query が発火し、data.card が描画されるまで待つ
    await waitFor(() => {
      expect(client.executeQuery).toHaveBeenCalled()
    })
    // query は cardId=1 で呼ばれる
    expect(client.executeQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { id: 1 },
      }),
      expect.anything(),
    )

    // 編集パネル（CardEditAction の Save）が表示される → data.card 経由で描画された証拠
    await waitFor(() => {
      expect(
        document.querySelector('input[data-testid="phrase-input"]'),
      ).not.toBeNull()
    })
    const phraseInput = document.querySelector(
      'input[data-testid="phrase-input"]',
    ) as HTMLInputElement
    expect(phraseInput.defaultValue).toBe('fetch query phrase')
  })

  it('cardId 未指定時は query が pause され呼ばれない（edge: pause）', async () => {
    const client = createTestClient({
      GetCardOnDeckEditor: ok(mockGetCardOnDeckEditorQueryData()),
    })
    render(<DeckEditor cards={[]} deckId={1} />, {
      wrapper: composeEditorWrapper(client),
    })

    // 一瞬待っても query は発火しない（pause + SWR key=null）
    await waitFor(() => {
      // 左パネルの Cards タイトルは描画される
      expect(document.querySelector('[data-testid="phrase-input"]')).toBeNull()
    })
    expect(client.executeQuery).not.toHaveBeenCalled()
  })

  it('error レスポンス時は card 編集パネルを表示せずクラッシュしない（edge: error）', async () => {
    const client = createTestClient({
      GetCardOnDeckEditor: fail(new Error('network down')),
    })
    render(<DeckEditor cards={[]} cardId={1} deckId={1} />, {
      wrapper: composeEditorWrapper(client),
    })

    // query は発火する（SWR 経由）が error で拒否
    await waitFor(() => {
      expect(client.executeQuery).toHaveBeenCalled()
    })

    // error 時は data.card が falsy のため編集パネル（phrase-input）は描画されない
    await waitFor(() => {
      expect(
        document.querySelector('input[data-testid="phrase-input"]'),
      ).toBeNull()
    })
    expect(
      document.querySelector('input[data-testid="phrase-input"]'),
    ).toBeNull()
  })
})
