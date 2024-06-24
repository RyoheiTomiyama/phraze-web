import { zodResolver } from '@hookform/resolvers/zod'
import { useForm as useReactHookForm, UseFormProps } from 'react-hook-form'
import { Schema, z } from 'zod'

type Input<T extends Schema> = z.input<T>
type Output<T extends Schema> = z.output<T>

export const useForm = <T extends Schema, TContext = unknown>(
  schema: T,
  options?: UseFormProps<Input<T>, TContext>,
) => {
  return useReactHookForm<Input<T>, TContext, Output<T>>({
    ...options,
    resolver: zodResolver(schema),
  })
}
