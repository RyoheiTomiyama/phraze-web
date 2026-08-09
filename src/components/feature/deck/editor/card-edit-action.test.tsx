import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { toast } from 'sonner'
import { parseGQLError } from '@/lib/gql'
import { CardEditAction } from './card-edit-action'

const { updateCardMock, resetMock, handleSubmitMock, onValidRef, isDirtyRef } =
  vi.hoisted(() => {
    return {
      updateCardMock: vi.fn(),
      resetMock: vi.fn(),
      handleSubmitMock: vi.fn(),
      onValidRef: {
        current: null as null | ((d: unknown) => Promise<void>),
      },
      isDirtyRef: { current: false },
    }
  })

vi.mock('./card-edit-action.generated', () => {
  return {
    useUpdateCardOnCardEditActionMutation: () => {
      return [{ fetching: false }, updateCardMock]
    },
  }
})

vi.mock('@/hook/useForm', () => {
  return {
    useFormContext: () => {
      return {
        formState: { isDirty: isDirtyRef.current },
        handleSubmit: (onValid: (d: unknown) => Promise<void>) => {
          onValidRef.current = onValid
          return handleSubmitMock
        },
        reset: resetMock,
      }
    },
  }
})

vi.mock('./card-delete/card-delete-button', async () => {
  const { createElement } = await import('react')
  return {
    CardDeleteButton: (props: { cardId: number; onBack?: () => void }) => {
      return createElement(
        'button',
        {
          'data-testid': 'card-delete',
          'data-cardid': String(props.cardId),
          onClick: props.onBack,
        },
        'CardDelete',
      )
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

describe('CardEditAction', () => {
  beforeEach(() => {
    isDirtyRef.current = false
    onValidRef.current = null
    updateCardMock.mockReset()
    resetMock.mockReset()
    handleSubmitMock.mockReset()
    vi.mocked(parseGQLError).mockReset()
    vi.mocked(toast.success).mockClear()
    vi.mocked(toast.error).mockClear()
  })

  it('isDirty=false で Save ボタンは disabled', () => {
    isDirtyRef.current = false
    render(<CardEditAction cardId={1} />)
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled()
  })

  it('isDirty=true で Save ボタンは有効', () => {
    isDirtyRef.current = true
    render(<CardEditAction cardId={1} />)
    expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled()
  })

  it('戻るボタンクリックで onBack が呼ばれる', async () => {
    const onBack = vi.fn()
    const user = userEvent.setup()
    render(<CardEditAction cardId={1} onBack={onBack} />)
    await user.click(screen.getByRole('button', { name: '' }))
    expect(onBack).toHaveBeenCalled()
  })

  it('CardDeleteButton に cardId と onBack が渡る', async () => {
    const onBack = vi.fn()
    const user = userEvent.setup()
    render(<CardEditAction cardId={7} onBack={onBack} />)
    const cardDelete = screen.getByTestId('card-delete')
    expect(cardDelete).toHaveAttribute('data-cardid', '7')
    await user.click(cardDelete)
    expect(onBack).toHaveBeenCalled()
  })

  it('Save クリックで handleSubmit が呼ばれ onValid で updateCard が呼ばれる', async () => {
    isDirtyRef.current = true
    updateCardMock.mockResolvedValueOnce({ error: null })
    const user = userEvent.setup()
    render(<CardEditAction cardId={5} />)
    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(handleSubmitMock).toHaveBeenCalled()
    await onValidRef.current!({ question: 'q', answer: 'a' })
    await waitFor(() => {
      expect(updateCardMock).toHaveBeenCalledWith({
        input: { id: 5, answer: 'a', question: 'q' },
      })
    })
  })

  it('更新成功で reset と toast.success が呼ばれる', async () => {
    isDirtyRef.current = true
    updateCardMock.mockResolvedValueOnce({ error: null })
    const user = userEvent.setup()
    render(<CardEditAction cardId={5} />)
    await user.click(screen.getByRole('button', { name: 'Save' }))
    await onValidRef.current!({ question: 'q', answer: 'a' })
    await waitFor(() => {
      expect(resetMock).toHaveBeenCalledWith(
        { question: 'q', answer: 'a' },
        { keepDirty: true, keepTouched: true },
      )
      expect(toast.success).toHaveBeenCalledWith('Card has been saved')
    })
  })

  it('更新エラーで toast.error が呼ばれ reset は呼ばれない', async () => {
    isDirtyRef.current = true
    updateCardMock.mockResolvedValueOnce({ error: { kind: 'err' } })
    vi.mocked(parseGQLError).mockReturnValue({ message: 'parsed' } as never)
    const user = userEvent.setup()
    render(<CardEditAction cardId={5} />)
    await user.click(screen.getByRole('button', { name: 'Save' }))
    await onValidRef.current!({ question: 'q', answer: 'a' })
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('parsed')
    })
    expect(resetMock).not.toHaveBeenCalled()
  })
})
