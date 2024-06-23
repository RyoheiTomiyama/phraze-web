import { useCallback } from 'react'
import { useDialogDispatchContext, useDialogIdContext } from './dialog-context'

type UseDialogComponentReturnType = {
  hide: () => Promise<void>
}

/** Dialogコンポーネント内で呼び出すHooks */
export const useDialogComponent = (): UseDialogComponentReturnType => {
  const id = useDialogIdContext()
  const dispatch = useDialogDispatchContext()

  const hide = useCallback(async () => {
    if (!id) {
      return
    }

    dispatch({
      type: 'hide',
      payload: { id },
    })
  }, [dispatch, id])

  return {
    hide,
  }
}
