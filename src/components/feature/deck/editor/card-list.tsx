import { useCallback } from 'react'
import { CardOnCardListFragment } from './card-list.generated'
import {
  $convertFromMarkdownString,
  BOLD_STAR,
  BOLD_UNDERSCORE,
} from '@lexical/markdown'
import { InputViewer } from '@/components/common/editor'

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
            className="px-6 py-2 cursor-pointer hover:bg-muted data-[active='true']:font-bold data-[active='true']:bg-accent"
            onClick={handleClick(card.id)}
          >
            <span className=" line-clamp-1 text-muted-foreground">
              <CardViewer value={card.question} />
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

type CardViewerProps = { value: string }
const CardViewer = (props: CardViewerProps) => {
  const editorState = useCallback(() => {
    $convertFromMarkdownString(props.value, [BOLD_STAR, BOLD_UNDERSCORE])
  }, [props.value])

  return <InputViewer defaultEditorState={editorState} namespace="phrase" />
}
