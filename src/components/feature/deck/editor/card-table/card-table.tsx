// import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  //   CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
// import { Plus } from 'lucide-react'
// import Link from 'next/link'
import {
  CardOnCardTableFragment,
  PageInfoOnCardTableFragment,
} from './card-table.generated'
import { useCallback, useState } from 'react'
import {
  $convertFromMarkdownString,
  BOLD_STAR,
  BOLD_UNDERSCORE,
} from '@lexical/markdown'
import { InputViewer } from '@/components/common/editor'
import {
  HeadingNode,
  ListItemNode,
  ListNode,
} from '@/components/common/editor/node'
import { formatDateTime } from '@/lib/date-util'
import { CardTablePagination } from './card-table-pagination'
import { CardTableMenu } from './card-table-menu'
import { CardTableEditDrawer } from './card-table-edit-drawer'

type CardTableProps = {
  cards: CardOnCardTableFragment[]
  deckId: number
  pageInfo: {
    limit: number
    offset: number
    totalCount: PageInfoOnCardTableFragment['totalCount']
  }
}

export const CardTable = ({ cards, deckId, pageInfo }: CardTableProps) => {
  const [selectedCardId, setSelectedCardId] = useState<number>()

  const handleEditCard = useCallback((id: number) => {
    return () => {
      setSelectedCardId(id)
    }
  }, [])

  const handleOpenChange = useCallback((open: boolean) => {
    if (open) {
      return
    }

    setSelectedCardId(undefined)
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="flex-1 grid gap-2">
          <CardTitle>Cards</CardTitle>
          {/* <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription> */}
        </div>
        {/* <Button asChild variant="outline" size="sm" className="gap-2">
          <Link href="#">
            <Plus className="w-4" />
            新規追加
          </Link>
        </Button> */}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Question</TableHead>
              <TableHead className="w-[800px] hidden md:table-cell">
                Answer
              </TableHead>
              <TableHead className="w-[230px] min-w-[186px]" colSpan={2}>
                Next schedule
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cards.map((card) => {
              return (
                <TableRow key={card.id} onClick={handleEditCard(card.id)}>
                  <TableCell className="align-top">
                    <QuestionViewer value={card.question} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell align-top">
                    {card.answer || card.aiAnswer ? (
                      <AnswerViewer value={card.answer || card.aiAnswer} />
                    ) : (
                      <p className="text-muted-foreground">
                        AIが解答生成中です。リロードしてください。
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="align-top">
                    {card.schedule
                      ? formatDateTime(card.schedule?.scheduleAt)
                      : 'now'}
                  </TableCell>
                  <TableCell className="align-middle text-right">
                    <span
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      <CardTableMenu
                        cardId={card.id}
                        onEdit={handleEditCard(card.id)}
                      />
                    </span>
                  </TableCell>
                </TableRow>
              )
            })}
            {!cards.length && (
              <TableRow>
                <TableCell colSpan={3}>
                  <p className="text-sm text-center text-primary/40">
                    カードが一つも登録されていません。
                    <br />
                    学習カードを作成しましょう。
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {pageInfo.totalCount > pageInfo.limit && (
          <CardTablePagination deckId={deckId} {...pageInfo} />
        )}
        <CardTableEditDrawer
          cardId={selectedCardId}
          open={!!selectedCardId}
          onOpenChange={handleOpenChange}
        />
      </CardContent>
    </Card>
  )
}

type QuestionViewerProps = { value: string }
const QuestionViewer = (props: QuestionViewerProps) => {
  const editorState = useCallback(() => {
    $convertFromMarkdownString(props.value, [BOLD_STAR, BOLD_UNDERSCORE])
  }, [props.value])

  return <InputViewer defaultEditorState={editorState} namespace="question" />
}

type AnswerViewerProps = { value: string }
const AnswerViewer = (props: AnswerViewerProps) => {
  const editorState = useCallback(() => {
    // $convertFromMarkdownString(props.value, [
    //   BOLD_STAR,
    //   BOLD_UNDERSCORE,
    //   HEADING,
    // ])
    $convertFromMarkdownString(props.value, undefined, undefined, false)
  }, [props.value])

  return (
    <InputViewer
      defaultEditorState={editorState}
      nodes={[HeadingNode, ListNode, ListItemNode]}
      namespace="answer"
      className="[&_br]:hidden [&_*]:inline line-clamp-3"
    />
  )
}
