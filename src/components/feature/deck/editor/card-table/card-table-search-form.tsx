import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from '@/hook/useForm'
import {
  cardTableSearchFormSchema,
  CardTableSearchFormSchemaOutput,
} from './card-table-search-form-schema'
import { useCallback } from 'react'
import { SubmitHandler } from 'react-hook-form'

type CardTableSearchFormProps = {
  defaultValue?: string
  onSubmit: (q?: string) => void
}

export const CardTableSearchForm: React.FC<CardTableSearchFormProps> = ({
  defaultValue,
  onSubmit,
}) => {
  const form = useForm(cardTableSearchFormSchema, {
    defaultValues: {
      q: defaultValue ?? '',
    },
  })

  const handleSubmit = useCallback<
    SubmitHandler<CardTableSearchFormSchemaOutput>
  >(
    async (data) => {
      onSubmit(data.q || undefined)
    },
    [onSubmit],
  )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-1 justify-end"
      >
        <FormField
          control={form.control}
          name="q"
          render={({ field }) => {
            return (
              <FormItem className="flex-1 w-full max-w-md">
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Search cards..."
                    className="w-full max-w-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
      </form>
    </Form>
  )
}
