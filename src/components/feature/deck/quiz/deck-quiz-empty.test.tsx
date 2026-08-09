import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DeckQuizEmpty } from './deck-quiz-empty'

vi.mock('./deck-quiz-empty.generated', () => {
  return {}
})

describe('DeckQuizEmpty', () => {
  it('タイトルと説明を表示する', () => {
    render(<DeckQuizEmpty deckId={1} />)
    expect(screen.getByText('You have no cards')).toBeInTheDocument()
    expect(
      screen.getByText('まだカードが一つも登録されていません。'),
    ).toBeInTheDocument()
    expect(screen.getByText('学習カードを作成しましょう。')).toBeInTheDocument()
  })

  it('Create Card リンクの href が /deck/1/admin になる', () => {
    render(<DeckQuizEmpty deckId={1} />)
    expect(screen.getByRole('link', { name: 'Create Card' })).toHaveAttribute(
      'href',
      '/deck/1/admin',
    )
  })

  it('className を渡すとルート Card にマージされる', () => {
    const { container } = render(
      <DeckQuizEmpty deckId={1} className="custom-empty" />,
    )
    expect(container.firstChild).toHaveClass('custom-empty')
  })

  it('追加の props がルート Card に spread される', () => {
    render(<DeckQuizEmpty deckId={1} data-testid="empty-root" />)
    expect(screen.getByTestId('empty-root')).toBeInTheDocument()
  })
})
