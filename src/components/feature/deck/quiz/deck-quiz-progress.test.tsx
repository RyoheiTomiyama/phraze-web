import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DeckQuizProgress } from './deck-quiz-progress'

describe('DeckQuizProgress', () => {
  it('count を表示する', () => {
    render(<DeckQuizProgress count={3} totalCount={10} />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('バー幅が count/totalCount*100% になる', () => {
    const { container } = render(<DeckQuizProgress count={3} totalCount={10} />)
    const bar = container.querySelector('span[style]') as HTMLElement
    expect(bar.style.width).toBe('30%')
  })

  it('count=0 のときバー幅は 0%', () => {
    const { container } = render(<DeckQuizProgress count={0} totalCount={10} />)
    const bar = container.querySelector('span[style]') as HTMLElement
    expect(bar.style.width).toBe('0%')
  })
})
