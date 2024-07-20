import { Button } from '@/components/ui/button'
import { useFormContext } from '@/hook/useForm'
import { cardEditSchema } from './card-edit-schema'
import { useMemo } from 'react'
import { useUpdateCardOnCardEditActionMutation } from './card-edit-action.generated'
import { logger } from '@/lib/logger'
import { parseGQLError } from '@/lib/gql'
import { toast } from 'sonner'

type CardEditActionProps = {
  cardId: number
  onSubmitted?: () => void
}
export const CardEditAction = ({ cardId }: CardEditActionProps) => {
  const [_, updateCard] = useUpdateCardOnCardEditActionMutation()
  const { formState, handleSubmit, reset } =
    useFormContext<typeof cardEditSchema>()

  const handleClick = useMemo(() => {
    return handleSubmit(async (data) => {
      const { error } = await updateCard({
        input: {
          id: cardId,
          answer: data.answer,
          question: data.question,
        },
      })

      if (error) {
        const e = parseGQLError(error)
        toast.error(e.message)
      } else {
        reset(data, { keepDirty: true, keepTouched: true })
        toast.success('Card has been saved')
      }
    }, logger.warn)
  }, [cardId, handleSubmit, reset, updateCard])

  return (
    <div className="px-6 py-2 md:pt-4  flex flex-row justify-end">
      <Button
        size="sm"
        variant="outline"
        onClick={handleClick}
        disabled={!formState.isDirty}
      >
        Save
      </Button>
    </div>
  )
}
