import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import PhraseInput from './phrase-input'

export const CardEdit = () => {
  const form = useForm({
    defaultValues: {
      question: '',
      answer: 'hoge',
    },
  })

  return (
    <Form {...form}>
      <div className="flex flex-col gap-4 px-6 py-6">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Phrase / Word</FormLabel>
                <FormDescription className="text-xs">
                  フレーズの中で覚えたい単語があれば太字にしてください
                </FormDescription>
                <FormControl>
                  <PhraseInput />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Phrase / Word</FormLabel>
                <FormDescription className="text-xs">
                  フレーズの中で覚えたい単語があれば太字にしてください
                </FormDescription>
                <FormControl>
                  <Input placeholder="覚えたいフレーズ・単語" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        {/* <Editor namespace="editor" /> */}
      </div>
    </Form>
  )
}
