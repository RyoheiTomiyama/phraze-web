import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ReactNode } from 'react'

type ConfirmDialogProps = {
  description?: ReactNode
  open?: boolean
  title?: ReactNode
  onCancel?: () => void
  onOk?: () => void
}

export const ConfirmDialog = ({
  description,
  open,
  title,
  onCancel,
  onOk,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            size="sm"
            variant="outline"
            className="min-w-20"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button size="sm" className="min-w-20" onClick={onOk}>
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
