import { zodResolver } from '@hookform/resolvers/zod'
import {
  useForm as useReactHookForm,
  UseFormProps,
  useFormContext as useReactFormContext,
  FieldValues,
} from 'react-hook-form'
import { z, ZodType } from 'zod'

type Input<T extends ZodType<FieldValues, FieldValues>> = z.input<T>
type Output<T extends ZodType<FieldValues, FieldValues>> = z.output<T>

export const useForm = <
  T extends ZodType<FieldValues, FieldValues>,
  TContext = unknown,
>(
  schema: T,
  options?: UseFormProps<Input<T>, TContext, Output<T>>,
) => {
  return useReactHookForm({
    ...options,
    resolver: zodResolver(schema),
  })
}

export const useFormContext = <
  T extends ZodType<FieldValues, FieldValues>,
  TContext = unknown,
>() => {
  return useReactFormContext<Input<T>, TContext, Output<T>>()
}
