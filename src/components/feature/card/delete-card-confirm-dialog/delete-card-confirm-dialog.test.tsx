import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Dialog } from '@/components/ui/dialog'
import { DeleteCardConfirmDialog } from './delete-card-confirm-dialog'

const renderDialog = (props: { loading?: boolean; onSubmit?: () => void }) => {
  return render(
    <Dialog open={true}>
      <DeleteCardConfirmDialog {...props} />
    </Dialog>,
  )
}

describe('DeleteCardConfirmDialog', () => {
  it('タイトルと説明を表示する', () => {
    renderDialog({})
    expect(screen.getByText('Delete Card')).toBeInTheDocument()
    expect(screen.getByText(/カードを削除します/)).toBeInTheDocument()
  })

  it('Delete ボタンクリックで onSubmit が呼ばれる', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    renderDialog({ onSubmit })
    await user.click(screen.getByRole('button', { name: 'Delete' }))
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('loading のとき Delete ボタンは disabled', () => {
    renderDialog({ loading: true })
    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled()
  })

  it('loading でないとき Delete ボタンは有効', () => {
    renderDialog({ loading: false })
    expect(screen.getByRole('button', { name: 'Delete' })).toBeEnabled()
  })
})
