import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { useFormContext } from 'react-hook-form'
import type { CardOnCardFormFragment } from './card-form.generated'
import { CardForm } from './card-form'

vi.mock('./card-form.generated', () => {
  return {}
})

const ValuesConsumer = () => {
  const { watch } = useFormContext()
  return (
    <>
      <span data-testid="question">{String(watch('question'))}</span>
      <span data-testid="answer">{String(watch('answer'))}</span>
    </>
  )
}

const card: CardOnCardFormFragment = {
  __typename: 'Card',
  id: 1,
  question: 'q1',
  answer: 'a1',
  aiAnswer: 'ai',
}

describe('CardForm', () => {
  it('children を描画する', () => {
    render(
      <CardForm card={card}>
        <span>child-content</span>
      </CardForm>,
    )
    expect(screen.getByText('child-content')).toBeInTheDocument()
  })

  it('card の question/answer が form に設定される', async () => {
    render(
      <CardForm card={card}>
        <ValuesConsumer />
      </CardForm>,
    )
    await waitFor(() => {
      expect(screen.getByTestId('question')).toHaveTextContent('q1')
    })
    expect(screen.getByTestId('answer')).toHaveTextContent('a1')
  })

  it('answer が空のとき aiAnswer にフォールバックする', async () => {
    render(
      <CardForm card={{ ...card, answer: '' }}>
        <ValuesConsumer />
      </CardForm>,
    )
    await waitFor(() => {
      expect(screen.getByTestId('question')).toHaveTextContent('q1')
      expect(screen.getByTestId('answer')).toHaveTextContent('ai')
    })
  })

  it('card が undefined のときクラッシュしない', async () => {
    render(
      <CardForm card={undefined}>
        <ValuesConsumer />
      </CardForm>,
    )
    await waitFor(() => {
      expect(screen.getByTestId('question')).toHaveTextContent('undefined')
      expect(screen.getByTestId('answer')).toHaveTextContent('undefined')
    })
  })
})
