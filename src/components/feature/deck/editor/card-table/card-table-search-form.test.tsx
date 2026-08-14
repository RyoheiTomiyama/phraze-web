import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CardTableSearchForm } from './card-table-search-form'

describe('CardTableSearchForm', () => {
  it('defaultValue で Input の初期値が設定される', () => {
    render(<CardTableSearchForm defaultValue="foo" onSubmit={vi.fn()} />)
    expect(screen.getByPlaceholderText('Search cards...')).toHaveValue('foo')
  })

  it('入力して Enter で onSubmit が呼ばれる', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<CardTableSearchForm onSubmit={onSubmit} />)
    const input = screen.getByPlaceholderText('Search cards...')
    await user.type(input, 'foo{Enter}')
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith('foo')
    })
  })

  it('空入力で Enter で onSubmit(undefined) が呼ばれる', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<CardTableSearchForm onSubmit={onSubmit} />)
    const input = screen.getByPlaceholderText('Search cards...')
    await user.type(input, '{Enter}')
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(undefined)
    })
  })

  it('256文字超でバリデーションエラーになり onSubmit は呼ばれない', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<CardTableSearchForm onSubmit={onSubmit} />)
    const input = screen.getByPlaceholderText('Search cards...')
    await user.type(input, `${'a'.repeat(257)}{Enter}`)
    await waitFor(() => {
      expect(screen.getByText(/256/)).toBeInTheDocument()
    })
    expect(onSubmit).not.toHaveBeenCalled()
  })
})
