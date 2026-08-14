import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QuizAction } from './quiz-action'

describe('QuizAction', () => {
  it('show=false のとき Show Answer ボタンを表示しクリックで onShowAnswer が呼ばれる', async () => {
    const onShowAnswer = vi.fn()
    const onResponse = vi.fn()
    const user = userEvent.setup()
    render(
      <QuizAction
        show={false}
        onShowAnswer={onShowAnswer}
        onResponse={onResponse}
      />,
    )
    await user.click(screen.getByRole('button', { name: /show answer/i }))
    expect(onShowAnswer).toHaveBeenCalledTimes(1)
    expect(onResponse).not.toHaveBeenCalled()
  })

  it('show=true のとき Easy/Unsure/Again 各クリックで onResponse が grade 付きで呼ばれる', async () => {
    const onResponse = vi.fn()
    const user = userEvent.setup()
    render(<QuizAction show={true} onResponse={onResponse} />)
    await user.click(screen.getByRole('button', { name: /easy/i }))
    await user.click(screen.getByRole('button', { name: /unsure/i }))
    await user.click(screen.getByRole('button', { name: /again/i }))
    expect(onResponse).toHaveBeenNthCalledWith(1, 5)
    expect(onResponse).toHaveBeenNthCalledWith(2, 3)
    expect(onResponse).toHaveBeenNthCalledWith(3, 1)
  })
})
