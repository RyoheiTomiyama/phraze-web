import { ComponentType, useCallback, useMemo } from 'react'
import { v7 as uuid } from 'uuid'
import { useDialogDispatchContext } from './dialog-context'

type UseDialogReturnType<P> = {
  show: (props?: P) => Promise<void>
  hide: () => Promise<void>
}

/**
 * ダイアログ表示用Hooks
 *
 * ```ts
 * const show = useDialog(ComfirmDialog, {title: '作成してよろしいですか'})
 *
 * return <Button onClick={show}>作成する</Button>
 * ```
 */
export const useDialog = <P extends Record<string, unknown>>(
  Component: ComponentType<P>,
  args?: NoInfer<P>,
): UseDialogReturnType<P> => {
  const id = uuid()
  const dispatch = useDialogDispatchContext()

  const show = useCallback(
    async (innerArgs?: P) => {
      dispatch({
        type: 'show',
        payload: {
          id,
          Component,
          args: innerArgs || args,
        },
      })
    },
    [Component, args, dispatch, id],
  )

  const hide = useCallback(async () => {
    dispatch({
      type: 'hide',
      payload: {
        id,
      },
    })
  }, [dispatch, id])

  return useMemo(() => {
    return { show, hide }
  }, [hide, show])
}
