import { DeckOnDeckListFragment } from './deck-list.generated'

type DeckItemProps = {
  item: DeckOnDeckListFragment
}

export const DeckItem = ({ item }: DeckItemProps) => {
  return <div>{item.name}</div>
}
