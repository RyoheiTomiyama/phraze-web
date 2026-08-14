import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Appbar } from './appbar'

describe('Appbar', () => {
  it('children を描画する', () => {
    render(<Appbar>内容</Appbar>)
    expect(screen.getByText('内容')).toBeInTheDocument()
  })

  it('className 未指定時はベースクラスが適用される', () => {
    const { container } = render(<Appbar>x</Appbar>)
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass('px-6')
  })

  it('className 指定時は twMerge で衝突が解決される', () => {
    const { container } = render(<Appbar className="px-10">x</Appbar>)
    const div = container.firstChild as HTMLElement
    expect(div).not.toHaveClass('px-6')
    expect(div).toHaveClass('px-10')
  })
})
