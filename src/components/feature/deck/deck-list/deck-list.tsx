import { DeckOnDeckListFragment } from './deck-list.generated'
import { DeckItem } from './item'

type DeckListProps = {
  decks: DeckOnDeckListFragment[]
}

export const DeckList = ({ decks }: DeckListProps) => {
  return (
    <div>
      {decks.map((deck) => {
        return <DeckItem key={deck.id} item={deck} />
      })}
    </div>
  )
}
