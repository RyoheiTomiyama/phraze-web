import { DeleteCardConfirmDialog } from '@/components/feature/card'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useDeleteCardOnCardTableMenuMutation } from './card-table-menu.generated'
import { toast } from 'sonner'
import { parseGQLError } from '@/lib/gql'

type CardTableMenuProps = {
  cardId: number
  onEdit: (cardId: number) => void
}

export const CardTableMenu = ({ cardId, onEdit }: CardTableMenuProps) => {
  const [openDelete, setOpenDelete] = useState(false)
  const [{ fetching }, deleteCard] = useDeleteCardOnCardTableMenuMutation()

  const handleSubmit = useCallback(async () => {
    const { error } = await deleteCard(
      {
        input: {
          id: cardId,
        },
      },
      { additionalTypenames: ['Card'] },
    )

    if (error) {
      const e = parseGQLError(error)
      toast.error(e.message)
    } else {
      setOpenDelete(false)
      toast.success('Card has been deleted')
    }
  }, [cardId, deleteCard])

  return (
    <>
      <DropdownMenu modal={true}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisVertical className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              return onEdit(cardId)
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => {
              return setOpenDelete(true)
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DeleteCardConfirmDialog loading={fetching} onSubmit={handleSubmit} />
      </Dialog>
    </>
  )
}
