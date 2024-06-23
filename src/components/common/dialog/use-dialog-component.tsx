import { useCallback } from 'react'
import { useDialogDispatchContext, useDialogIdContext } from './dialog-context'

type UseDialogComponentReturnType = {
  hide: () => Promise<void>
}

/** 
 * Dialogコンポーネント内で呼び出すHooks
 * 
 * ```ts
    function MyDialog() {
      const { hide } = useDialogComponent()

      return (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
            <Button onClick={hide}>close</Button>
          </DialogHeader>
        </DialogContent>
      )
    }
 * ```
 */
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
