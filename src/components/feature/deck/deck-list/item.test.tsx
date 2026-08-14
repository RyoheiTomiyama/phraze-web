import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DeckItem } from './item'

beforeAll(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2024-01-01T00:05:00'))
})
afterAll(() => {
  vi.useRealTimers()
})

const props = {
  name: 'My Deck',
  totalCount: 10,
  pendingCount: 3,
  editLink: '/edit',
  startLink: '/start',
} as const

describe('DeckItem', () => {
  it('name と各カウント（All/In progres/Done）を表示する', () => {
    render(<DeckItem {...props} />)
    expect(screen.getByText('My Deck')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument()
  })

  it('editLink / startLink の href が反映される', () => {
    const { container } = render(
      <DeckItem
        name="d"
        totalCount={1}
        pendingCount={1}
        editLink="/edit/1"
        startLink="/start/1"
      />,
    )
    expect(container.querySelector('a[href="/edit/1"]')).not.toBeNull()
    expect(container.querySelector('a[href="/start/1"]')).not.toBeNull()
  })

  it('pendingCount > 0 のとき Start Now は有効', () => {
    render(<DeckItem {...props} />)
    expect(screen.getByRole('button', { name: /start now/i })).toBeEnabled()
  })

  it('pendingCount <= 0 のとき Start Now は disabled', () => {
    render(
      <DeckItem
        name="d"
        totalCount={1}
        pendingCount={0}
        editLink="/e"
        startLink="/s"
      />,
    )
    expect(screen.getByRole('button', { name: /start now/i })).toBeDisabled()
  })

  it('schduleAt があるとき相対時刻を表示する', () => {
    render(<DeckItem {...props} schduleAt={new Date('2024-01-01T00:00:00')} />)
    expect(screen.getByText('5 minutes ago')).toBeInTheDocument()
  })
})
