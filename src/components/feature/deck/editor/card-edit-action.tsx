import { Button } from '@/components/ui/button'
import { useFormContext } from '@/hook/useForm'
import { cardEditSchema } from './card-edit-schema'
import { useMemo } from 'react'
import { useUpdateCardOnCardEditActionMutation } from './card-edit-action.generated'
import { logger } from '@/lib/logger'
import { parseGQLError } from '@/lib/gql'
import { toast } from 'sonner'
import { ChevronLeft } from 'lucide-react'

type CardEditActionProps = {
  cardId: number
  onBack?: () => void
}
export const CardEditAction = ({ cardId, onBack }: CardEditActionProps) => {
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
    <div className="px-6 pt-4 flex flex-row justify-between sm:justify-end gap-4">
      <Button
        size="icon"
        variant="ghost"
        onClick={onBack}
        className="sm:hidden w-9 h-9 -ml-3"
      >
        <ChevronLeft className="w-6" />
      </Button>
      <Button
        size="sm"
        variant="default"
        onClick={handleClick}
        disabled={!formState.isDirty}
      >
        Save
      </Button>
    </div>
  )
}
