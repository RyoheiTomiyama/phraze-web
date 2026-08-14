import { describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { FieldValues, useForm as useReactHookForm } from 'react-hook-form'
import { z, ZodType } from 'zod'
import { useForm } from './useForm'

const schema = z.object({
  name: z.string().min(1, '必須です'),
})

// useForm は ZodType<FieldValues, FieldValues> を要求するため、
// z.object の具象型をキャストして戻り値の型推論を維持する
const formSchema = schema as unknown as ZodType<FieldValues, FieldValues>

// react-hook-form の useForm を参照して戻り値の型を得るためのヘルパー
type FormReturn = ReturnType<typeof useReactHookForm>

describe('useForm', () => {
  it('resolver 経由でバリデーションエラーを formState.errors に格納する', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() => {
      return useForm(formSchema, { defaultValues: { name: '' } })
    })
    // formState の subscription を有効にするため事前参照
    void result.current.formState.errors

    await act(async () => {
      await (result.current as FormReturn).handleSubmit(onSubmit)()
    })

    expect(onSubmit).not.toHaveBeenCalled()
    expect(result.current.formState.errors.name?.message).toBe('必須です')
  })

  it('有効値のとき onSubmit が呼ばれ errors は空', async () => {
    const onSubmit = vi.fn()
    const { result } = renderHook(() => {
      return useForm(formSchema, { defaultValues: { name: 'ok' } })
    })
    void result.current.formState.errors

    await act(async () => {
      await (result.current as FormReturn).handleSubmit(onSubmit)()
    })

    expect(onSubmit).toHaveBeenCalledWith({ name: 'ok' }, undefined)
    expect(result.current.formState.errors.name).toBeUndefined()
  })

  it('defaultValues が初期値として反映される', () => {
    const { result } = renderHook(() => {
      return useForm(formSchema, { defaultValues: { name: 'init' } })
    })
    expect((result.current as FormReturn).getValues('name')).toBe('init')
  })
})
