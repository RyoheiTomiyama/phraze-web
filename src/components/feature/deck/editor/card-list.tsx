import { useCallback } from 'react'
import { CardOnCardListFragment } from './card-list.generated'

type CardListProps = {
  activeCardId?: number
  cards: CardOnCardListFragment[]
  onClick?: (id: number) => void
}
export const CardList = ({ activeCardId, cards, onClick }: CardListProps) => {
  const handleClick = useCallback(
    (id: number) => {
      return () => {
        onClick?.(id)
      }
    },
    [onClick],
  )

  return (
    <div>
      {cards.map((card) => {
        return (
          <div
            key={card.id}
            data-active={card.id === activeCardId}
            className="px-6 py-2 cursor-pointer hover:bg-muted data-[active='true']:font-bold"
            onClick={handleClick(card.id)}
          >
            <span className=" line-clamp-1 text-muted-foreground">
              {card.question}
            </span>
          </div>
        )
      })}
      {!cards.length && (
        <p className="px-6 text-xs">
          カードが一つも登録されていません。
          <br />
          学習カードを作成しましょう。
        </p>
      )}
    </div>
  )
}
