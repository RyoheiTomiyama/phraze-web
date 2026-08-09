import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { toast } from 'sonner'
import { parseGQLError } from '@/lib/gql'
import { CardCreate } from './card-create'

const { createCardMock, clearEditorMock } = vi.hoisted(() => {
  return { createCardMock: vi.fn(), clearEditorMock: vi.fn() }
})

vi.mock('./card-create.generated', () => {
  return {
    useCreateCardOnCardCreateMutation: () => {
      return [{ fetching: false }, createCardMock]
    },
  }
})

vi.mock('../phrase-input', async () => {
  const { createElement, forwardRef } = await import('react')
  return {
    PhraseInput: forwardRef(
      (
        props: {
          disabled?: boolean
          defaultValue?: string
          onChange?: (v: string) => void
          onBlur?: () => void
          onEnter?: (e: KeyboardEvent | null) => void
        },
        ref,
      ) => {
        return createElement('input', {
          'data-testid': 'phrase-input',
          type: 'text',
          defaultValue: props.defaultValue,
          ref: ref as never,
          onChange: (e) => {
            return props.onChange?.(e.currentTarget.value)
          },
        })
      },
    ),
  }
})

vi.mock('@/lib/lexical', () => {
  return {
    clearEditor: clearEditorMock,
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

describe('CardCreate', () => {
  beforeEach(() => {
    createCardMock.mockReset()
    clearEditorMock.mockReset()
    vi.mocked(parseGQLError).mockReset()
    vi.mocked(toast.success).mockClear()
    vi.mocked(toast.error).mockClear()
  })

  it('初期描画で PhraseInput と隠し submit button が存在する', () => {
    const { container } = render(<CardCreate deckId={1} onCreated={vi.fn()} />)
    expect(screen.getByTestId('phrase-input')).toBeInTheDocument()
    expect(container.querySelector('button[type=submit]')).not.toBeNull()
  })

  it('説明文を表示する', () => {
    render(<CardCreate deckId={1} onCreated={vi.fn()} />)
    expect(
      screen.getByText(/覚えたいフレーズ・単語を入力してください。/),
    ).toBeInTheDocument()
  })

  it('foo 入力後に submit で createCard が呼ばれる', async () => {
    createCardMock.mockResolvedValueOnce({
      data: { createCard: { card: { id: 9 } } },
      error: null,
    })
    const onCreated = vi.fn()
    const user = userEvent.setup()
    const { container } = render(
      <CardCreate deckId={1} onCreated={onCreated} />,
    )
    await user.type(screen.getByTestId('phrase-input'), 'foo')
    fireEvent.submit(container.querySelector('form')!)
    await waitFor(() => {
      expect(createCardMock).toHaveBeenCalledWith({
        input: { deckId: 1, question: 'foo' },
      })
    })
  })

  it('作成成功で toast.success・clearEditor・onCreated が呼ばれる', async () => {
    createCardMock.mockResolvedValueOnce({
      data: { createCard: { card: { id: 9 } } },
      error: null,
    })
    const onCreated = vi.fn()
    const user = userEvent.setup()
    const { container } = render(
      <CardCreate deckId={1} onCreated={onCreated} />,
    )
    await user.type(screen.getByTestId('phrase-input'), 'foo')
    fireEvent.submit(container.querySelector('form')!)
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Card has been created')
      expect(clearEditorMock).toHaveBeenCalled()
      expect(onCreated).toHaveBeenCalledWith(9)
    })
  })

  it('作成エラーで toast.error が呼ばれ clearEditor と onCreated は呼ばれない', async () => {
    createCardMock.mockResolvedValueOnce({ error: { kind: 'err' } })
    vi.mocked(parseGQLError).mockReturnValue({ message: 'parsed' } as never)
    const onCreated = vi.fn()
    const user = userEvent.setup()
    const { container } = render(
      <CardCreate deckId={1} onCreated={onCreated} />,
    )
    await user.type(screen.getByTestId('phrase-input'), 'foo')
    fireEvent.submit(container.querySelector('form')!)
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('parsed')
    })
    expect(clearEditorMock).not.toHaveBeenCalled()
    expect(onCreated).not.toHaveBeenCalled()
  })

  it('空入力で submit するとバリデーションエラーで createCard は呼ばれない', async () => {
    const { container } = render(<CardCreate deckId={1} onCreated={vi.fn()} />)
    fireEvent.submit(container.querySelector('form')!)
    await waitFor(() => {
      expect(screen.getByText(/1 character/i)).toBeInTheDocument()
    })
    expect(createCardMock).not.toHaveBeenCalled()
  })
})
