import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCallback, useState } from 'react'
import { DeckSchemaOutput, deckSchema } from './schema'
import { SubmitHandler } from 'react-hook-form'
import { useFormContext } from '@/hook/useForm/useForm'
import { Loader2 } from 'lucide-react'

type CreateDeckDialogProps = {
  onSubmit?: (data: DeckSchemaOutput) => void
}

export const CreateDeckDialog = ({ onSubmit }: CreateDeckDialogProps) => {
  const form = useFormContext<typeof deckSchema>()
  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback<SubmitHandler<DeckSchemaOutput>>(
    async (data) => {
      setLoading(true)
      await onSubmit?.(data)
      setLoading(false)
    },
    [onSubmit],
  )

  return (
    <DialogContent>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <DialogHeader>
          <DialogTitle>Create New Deck</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          デッキ名を入力してください。
          <br />
          単語やフレーズなど、ジャンル分けして学習することができます。
        </DialogDescription>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="YouTube学習用" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <DialogFooter>
          <Button type="submit" size="sm" className="gap-1" disabled={loading}>
            {loading && <Loader2 className="w-4 animate-spin" />}
            Create
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
