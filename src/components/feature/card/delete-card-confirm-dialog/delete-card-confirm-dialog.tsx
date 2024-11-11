import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Loader2 } from 'lucide-react'

type ConfirmDialogProps = {
  loading?: boolean
  onSubmit?: () => void
}
export const DeleteCardConfirmDialog = ({
  loading,
  onSubmit,
}: ConfirmDialogProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Card</DialogTitle>
      </DialogHeader>
      <DialogDescription className="text-sm leading-relaxed">
        カードを削除します。
        <br />
        一度削除したカードは戻すことができません。
        <br />
        本当に削除してよろしいですか？
      </DialogDescription>

      <DialogFooter>
        <Button
          onClick={onSubmit}
          size="sm"
          variant="destructive"
          className="gap-1"
          disabled={loading}
        >
          {loading && <Loader2 className="w-4 animate-spin" />}
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
