import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { toast } from 'sonner'
import { parseGQLError } from '@/lib/gql'
import { CardTableMenu } from './card-table-menu'

const { deleteCardMock } = vi.hoisted(() => {
  return { deleteCardMock: vi.fn() }
})

vi.mock('./card-table-menu.generated', () => {
  return {
    useDeleteCardOnCardTableMenuMutation: () => {
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

const openMenu = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole('button', { name: '' }))
}

describe('CardTableMenu', () => {
  it('Edit クリックで onEdit が cardId 付きで呼ばれる', async () => {
    const onEdit = vi.fn()
    const user = userEvent.setup()
    render(<CardTableMenu cardId={42} onEdit={onEdit} />)
    await openMenu(user)
    await user.click(screen.getByRole('menuitem', { name: 'Edit' }))
    expect(onEdit).toHaveBeenCalledWith(42)
  })

  it('Delete → 確認 → 削除成功で toast.success が出る', async () => {
    deleteCardMock.mockResolvedValueOnce({ error: null })
    const user = userEvent.setup()
    render(<CardTableMenu cardId={1} onEdit={vi.fn()} />)
    await openMenu(user)
    await user.click(screen.getByRole('menuitem', { name: 'Delete' }))
    await user.click(screen.getByRole('button', { name: 'Delete' }))
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Card has been deleted')
    })
    expect(deleteCardMock).toHaveBeenCalledWith(
      { input: { id: 1 } },
      { additionalTypenames: ['Card'] },
    )
  })

  it('削除エラーで toast.error が出る', async () => {
    deleteCardMock.mockResolvedValueOnce({ error: { kind: 'err' } })
    vi.mocked(parseGQLError).mockReturnValue({
      message: 'parsed error',
    } as never)
    const user = userEvent.setup()
    render(<CardTableMenu cardId={1} onEdit={vi.fn()} />)
    await openMenu(user)
    await user.click(screen.getByRole('menuitem', { name: 'Delete' }))
    await user.click(screen.getByRole('button', { name: 'Delete' }))
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('parsed error')
    })
  })
})
