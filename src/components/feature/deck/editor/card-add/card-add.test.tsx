import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { toast } from 'sonner'
import { parseGQLError } from '@/lib/gql'
import { CardAdd } from './card-add'

const { createCardMock } = vi.hoisted(() => {
  return { createCardMock: vi.fn() }
})

vi.mock('./card-add.generated', () => {
  return {
    useCreateCardOnCardAddMutation: () => {
      return [{ fetching: false }, createCardMock]
    },
  }
})

vi.mock('../phrase-input', async () => {
  const { createElement } = await import('react')
  return {
    PhraseInput: (props: {
      disabled?: boolean
      defaultValue?: string
      onChange?: (v: string) => void
      onBlur?: () => void
    }) => {
      return createElement('input', {
        'data-testid': 'phrase-input',
        type: 'text',
        defaultValue: props.defaultValue,
        onChange: (e) => {
          return props.onChange?.(e.currentTarget.value)
        },
      })
    },
  }
})

vi.mock('sonner', () => {
  return {
    toast: {
      error: vi.fn(),
      success: vi.fn(),
      warning: vi.fn(),
    },
  }
})

vi.mock('@/lib/gql', () => {
  return {
    parseGQLError: vi.fn(),
  }
})

describe('CardAdd', () => {
  beforeEach(() => {
    createCardMock.mockReset()
    vi.mocked(parseGQLError).mockReset()
    vi.mocked(toast.success).mockClear()
    vi.mocked(toast.error).mockClear()
  })

  it('Add Card ボタンを表示する', () => {
    render(<CardAdd deckId={1} onCreated={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Add Card' })).toBeInTheDocument()
  })

  it('disabled prop で Add Card ボタンが disabled になる', () => {
    render(<CardAdd deckId={1} disabled onCreated={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Add Card' })).toBeDisabled()
  })

  it('Add Card クリックで Dialog が開き Create New Card が表示される', async () => {
    const user = userEvent.setup()
    render(<CardAdd deckId={1} onCreated={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: 'Add Card' }))
    expect(screen.getByText('Create New Card')).toBeInTheDocument()
  })

  it('PhraseInput 入力後に Create クリックで createCard が呼ばれる', async () => {
    createCardMock.mockResolvedValueOnce({
      data: { createCard: { card: { id: 9 } } },
      error: null,
    })
    const user = userEvent.setup()
    render(<CardAdd deckId={1} onCreated={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: 'Add Card' }))
    await user.type(screen.getByTestId('phrase-input'), 'foo')
    await user.click(screen.getByRole('button', { name: 'Create' }))
    await waitFor(() => {
      expect(createCardMock).toHaveBeenCalledWith({
        input: { deckId: 1, question: 'foo' },
      })
    })
  })

  it('作成成功で toast.success と onCreated が呼ばれる', async () => {
    createCardMock.mockResolvedValueOnce({
      data: { createCard: { card: { id: 9 } } },
      error: null,
    })
    const onCreated = vi.fn()
    const user = userEvent.setup()
    render(<CardAdd deckId={1} onCreated={onCreated} />)
    await user.click(screen.getByRole('button', { name: 'Add Card' }))
    await user.type(screen.getByTestId('phrase-input'), 'foo')
    await user.click(screen.getByRole('button', { name: 'Create' }))
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Card has been created')
      expect(onCreated).toHaveBeenCalledWith(9)
    })
  })

  it('作成エラーで toast.error が呼ばれ onCreated は呼ばれない', async () => {
    createCardMock.mockResolvedValueOnce({ error: { kind: 'err' } })
    vi.mocked(parseGQLError).mockReturnValue({ message: 'parsed' } as never)
    const onCreated = vi.fn()
    const user = userEvent.setup()
    render(<CardAdd deckId={1} onCreated={onCreated} />)
    await user.click(screen.getByRole('button', { name: 'Add Card' }))
    await user.type(screen.getByTestId('phrase-input'), 'foo')
    await user.click(screen.getByRole('button', { name: 'Create' }))
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('parsed')
    })
    expect(onCreated).not.toHaveBeenCalled()
  })

  it('空入力で Create クリック時にバリデーションエラーで createCard は呼ばれない', async () => {
    const user = userEvent.setup()
    render(<CardAdd deckId={1} onCreated={vi.fn()} />)
    await user.click(screen.getByRole('button', { name: 'Add Card' }))
    await user.click(screen.getByRole('button', { name: 'Create' }))
    await waitFor(() => {
      expect(screen.getByText(/1 character/i)).toBeInTheDocument()
    })
    expect(createCardMock).not.toHaveBeenCalled()
  })
})
