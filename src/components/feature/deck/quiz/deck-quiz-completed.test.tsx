import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DeckQuizCompleted } from './deck-quiz-completed'

vi.mock('./deck-quiz-completed.generated', () => {
  return {}
})

describe('DeckQuizCompleted', () => {
  it('タイトルと説明を表示する', () => {
    render(<DeckQuizCompleted deckId={2} />)
    expect(
      screen.getByText('All cards are already completed!'),
    ).toBeInTheDocument()
    expect(screen.getByText('お疲れ様です！')).toBeInTheDocument()
    expect(
      screen.getByText('すべてのカードを学習しました。'),
    ).toBeInTheDocument()
  })

  it('Back to Dashboard リンクの href が /dashboard になる', () => {
    render(<DeckQuizCompleted deckId={2} />)
    expect(
      screen.getByRole('link', { name: 'Back to Dashboard' }),
    ).toHaveAttribute('href', '/dashboard')
  })

  it('Edit Deck リンクの href が /deck/2/admin になる', () => {
    render(<DeckQuizCompleted deckId={2} />)
    expect(screen.getByRole('link', { name: 'Edit Deck' })).toHaveAttribute(
      'href',
      '/deck/2/admin',
    )
  })
})
