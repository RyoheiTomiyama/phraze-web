import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CardTablePagination } from './card-table-pagination'

vi.mock('./card-table-pagination.generated', () => {
  return {}
})

describe('CardTablePagination', () => {
  it('totalCount/limit からページボタンを描画し、現在ページを outline にする', () => {
    render(
      <CardTablePagination
        deckId={1}
        limit={5}
        offset={0}
        totalCount={10}
        q="foo"
      />,
    )
    const page1 = screen.getByRole('link', { name: '1' })
    const page2 = screen.getByRole('link', { name: '2' })
    expect(page1).toHaveClass('border')
    expect(page2).not.toHaveClass('border')
  })

  it('各ページリンクの href が limit/offset/q を含む', () => {
    render(
      <CardTablePagination
        deckId={1}
        limit={5}
        offset={0}
        totalCount={10}
        q="foo"
      />,
    )
    expect(screen.getByRole('link', { name: '1' })).toHaveAttribute(
      'href',
      '/deck/1/admin?limit=5&offset=0&q=foo',
    )
    expect(screen.getByRole('link', { name: '2' })).toHaveAttribute(
      'href',
      '/deck/1/admin?limit=5&offset=5&q=foo',
    )
  })

  it('page=0 のとき prev は無効・next は有効', () => {
    const { container } = render(
      <CardTablePagination
        deckId={1}
        limit={5}
        offset={0}
        totalCount={10}
        q="foo"
      />,
    )
    const links = container.querySelectorAll('a')
    const prev = links[0]!
    const next = links[links.length - 1]!
    expect(prev.getAttribute('data-disabled')).toBe('true')
    expect(next.getAttribute('data-disabled')).toBe('false')
    expect(prev).toHaveAttribute('href', '/deck/1/admin?limit=5&offset=0&q=foo')
    expect(next).toHaveAttribute('href', '/deck/1/admin?limit=5&offset=5&q=foo')
  })

  it('q 省略時は href に q= が含まれない', () => {
    render(
      <CardTablePagination deckId={1} limit={5} offset={0} totalCount={10} />,
    )
    expect(screen.getByRole('link', { name: '1' })).toHaveAttribute(
      'href',
      '/deck/1/admin?limit=5&offset=0',
    )
  })

  it('offset 超過時は page が pageCount に補正される', () => {
    const { container } = render(
      <CardTablePagination deckId={1} limit={5} offset={100} totalCount={10} />,
    )
    const links = container.querySelectorAll('a')
    const prev = links[0]!
    const next = links[links.length - 1]!
    expect(prev.getAttribute('data-disabled')).toBe('false')
    expect(next.getAttribute('data-disabled')).toBe('true')
  })
})
