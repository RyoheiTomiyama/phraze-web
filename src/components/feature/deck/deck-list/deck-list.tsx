import { DeckOnDeckListFragment } from './deck-list.generated'
import { DeckItem } from './item'
import { ItemAdd } from './item-add'

type DeckListProps = {
  decks: DeckOnDeckListFragment[]
}

export const DeckList = ({ decks }: DeckListProps) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]  gap-4">
      {decks.map((deck) => {
        return <DeckItem key={deck.id} item={deck} />
      })}
    </div>
  )
}
