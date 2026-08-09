import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { toast } from 'sonner'
import { parseGQLError } from '@/lib/gql'
import { CardDeleteButton } from './card-delete-button'

const { deleteCardMock } = vi.hoisted(() => {
  return { deleteCardMock: vi.fn() }
})

vi.mock('./card-delete-button.generated', () => {
  return {
    useDeleteCardOnCardDeleteButtonMutation: () => {
      return [{ fetching: false }, deleteCardMock]
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

const openDialog = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole('button', { name: '' }))
}

const confirmDelete = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole('button', { name: 'Delete' }))
}

describe('CardDeleteButton', () => {
  beforeEach(() => {
    deleteCardMock.mockReset()
    vi.mocked(parseGQLError).mockReset()
    vi.mocked(toast.success).mockClear()
    vi.mocked(toast.error).mockClear()
  })

  it('Trash2 ボタンクリックで Dialog が開き Delete Card が表示される', async () => {
    const user = userEvent.setup()
    render(<CardDeleteButton cardId={1} />)
    await openDialog(user)
    expect(screen.getByText('Delete Card')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
  })

  it('Delete クリックで deleteCard が呼ばれる', async () => {
    deleteCardMock.mockResolvedValueOnce({ error: null })
    const user = userEvent.setup()
    render(<CardDeleteButton cardId={42} />)
    await openDialog(user)
    await confirmDelete(user)
    await waitFor(() => {
      expect(deleteCardMock).toHaveBeenCalledWith(
        { input: { id: 42 } },
        { additionalTypenames: ['Card'] },
      )
    })
  })

  it('削除成功で toast.success と onBack が呼ばれる', async () => {
    deleteCardMock.mockResolvedValueOnce({ error: null })
    const onBack = vi.fn()
    const user = userEvent.setup()
    render(<CardDeleteButton cardId={1} onBack={onBack} />)
    await openDialog(user)
    await confirmDelete(user)
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Card has been deleted')
    })
    expect(onBack).toHaveBeenCalled()
  })

  it('削除エラーで toast.error が呼ばれ onBack も呼ばれる', async () => {
    deleteCardMock.mockResolvedValueOnce({ error: { kind: 'err' } })
    vi.mocked(parseGQLError).mockReturnValue({
      message: 'parsed error',
    } as never)
    const onBack = vi.fn()
    const user = userEvent.setup()
    render(<CardDeleteButton cardId={1} onBack={onBack} />)
    await openDialog(user)
    await confirmDelete(user)
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('parsed error')
    })
    expect(onBack).toHaveBeenCalled()
  })

  it('onBack 未指定でもクラッシュしない', async () => {
    deleteCardMock.mockResolvedValueOnce({ error: null })
    const user = userEvent.setup()
    render(<CardDeleteButton cardId={1} />)
    await openDialog(user)
    await confirmDelete(user)
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Card has been deleted')
    })
  })
})
