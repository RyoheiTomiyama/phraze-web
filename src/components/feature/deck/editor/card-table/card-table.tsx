import { Button } from '@/components/ui/button'
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
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { CardOnCardTableFragment } from './card-table.generated'
import { useCallback } from 'react'
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

type CardTableProps = {
  cards: CardOnCardTableFragment[]
}

export const CardTable = ({ cards }: CardTableProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="flex-1 grid gap-2">
          <CardTitle>Cards</CardTitle>
          {/* <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription> */}
        </div>
        <Button asChild variant="outline" size="sm" className="gap-2">
          <Link href="#">
            <Plus className="w-4" />
            新規追加
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>
              <TableHead className="hidden md:table-cell">Answer</TableHead>
              <TableHead className="min-w-[160px]">Next schedule</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cards.map((card) => {
              return (
                <TableRow key={card.id}>
                  <TableCell className="align-top">
                    <QuestionViewer value={card.question} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <AnswerViewer value={card.answer || card.aiAnswer} />
                  </TableCell>
                  <TableCell className="align-top">
                    {card.schedule
                      ? formatDateTime(card.schedule?.scheduleAt)
                      : 'now'}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
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
