import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PlusCircle } from 'lucide-react'
import { useCallback, useState } from 'react'
import { PhraseInput } from '../phrase-input'
import { useForm } from '@/hook/useForm'
import { cardSchema } from './schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

export const CardAdd = () => {
  const [open, setOpen] = useState(false)

  const form = useForm(cardSchema, {
    defaultValues: {
      question: '',
    },
  })

  const handleCreate = useCallback(() => {
    // TODO create
    setOpen(false)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2">
            <PlusCircle className="h-3.5 w-3.5" />
            Add Card
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Card</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            覚えたいフレーズ・単語を入力してください。
            <br />
            フレーズの中で覚えたい単語があれば太字にすると、AIがより高い精度で回答を生成してくれます。
          </DialogDescription>
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <PhraseInput />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <DialogFooter>
            <Button size="sm">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Form>
    </Dialog>
  )
}
