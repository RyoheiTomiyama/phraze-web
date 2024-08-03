import { pagesPath } from '@/lib/pathpida/$path'
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
        return (
          <DeckItem
            key={deck.id}
            name={deck.name}
            editLink={pagesPath.deck._id(deck.id).edit.$url()}
            pendingCount={deck.deckInfo.pendingCardCount}
            totalCount={deck.deckInfo.totalCardCount}
            schduleAt={
              deck.deckInfo.scheduleAt
                ? new Date(deck.deckInfo.scheduleAt)
                : undefined
            }
            startLink={pagesPath.deck._id(deck.id).$url()}
          />
        )
      })}
      <ItemAdd />
    </div>
  )
}
