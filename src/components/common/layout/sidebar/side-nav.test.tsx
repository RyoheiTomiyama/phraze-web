import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SideNav } from './side-nav'

describe('SideNav', () => {
  it('7つのナビリンクが accessible name 付きで描画される', () => {
    render(<SideNav />)
    expect(screen.getByRole('link', { name: /acme inc/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /orders/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /products/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /customers/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /analytics/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /settings/i })).toBeInTheDocument()
  })

  it('全リンクの href が # である', () => {
    render(<SideNav />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(7)
    for (const link of links) {
      expect(link).toHaveAttribute('href', '#')
    }
  })
})
