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
export const ConfirmDialog = ({ loading, onSubmit }: ConfirmDialogProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>AI to generate answer</DialogTitle>
      </DialogHeader>
      <DialogDescription className="text-sm leading-relaxed">
        AIで解答を自動生成します。
        <br />
        現在入力されているAnswerを上書きして保存されますがよろしいですか？
      </DialogDescription>

      <DialogFooter>
        <Button
          onClick={onSubmit}
          size="sm"
          className="gap-1"
          disabled={loading}
        >
          {loading && <Loader2 className="w-4 animate-spin" />}
          Generate
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
