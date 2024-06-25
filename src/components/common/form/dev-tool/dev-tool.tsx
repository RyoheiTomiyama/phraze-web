import { DevTool as RHFDevTool } from '@hookform/devtools'
import { DevtoolUIProps } from '@hookform/devtools/dist/devToolUI'
import { useRouter } from 'next/router'
import { Control, FieldValues } from 'react-hook-form'

export function DevTool<T extends FieldValues>(
  props?:
    | ({
        id?: string | undefined
        control?: Control<T, unknown> | undefined
      } & Pick<DevtoolUIProps, 'placement' | 'styles'>)
    | undefined,
) {
  const router = useRouter()
  if (process.env.NODE_ENV === 'production' || !router.isReady) {
    return null
  }
  return <RHFDevTool {...props} />
}
