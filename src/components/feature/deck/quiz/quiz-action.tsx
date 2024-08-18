import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Frown, Laugh, Meh } from 'lucide-react'
import { useCallback } from 'react'

type QuizActionProps = {
  className?: string
  show: boolean
  onShowAnswer?: () => void
  onResponse?: (grade: number) => void
}

export const QuizAction = ({
  className,
  show,
  onShowAnswer,
  onResponse,
}: QuizActionProps) => {
  const handleResponse = useCallback(
    (grade: number) => {
      return () => {
        onResponse?.(grade)
      }
    },
    [onResponse],
  )

  if (!show) {
    return (
      <div
        className={cn(
          'flex justify-center min-w-32 p-1 rounded-full self-center',
          className,
        )}
      >
        <Button
          className="rounded-full w-full max-w-36"
          size="lg"
          onClick={onShowAnswer}
        >
          Show Answer
        </Button>
      </div>
    )
  }

  return (
    <div
      className={cn(
        `
      flex flex-row-reverse justify-center gap-2 min-w-32 p-1 rounded-full
      bg-black bg-opacity-30 self-center backdrop-blur-sm
      `,
        className,
      )}
    >
      <Button
        className="flex-auto rounded-full min-w-24 max-w-36 gap-0 flex-col h-auto px-6 py-1 font-bold"
        size="lg"
        onClick={handleResponse(5)}
      >
        <Laugh className="w-5" />
        Easy
      </Button>
      <Button
        className="flex-auto rounded-full min-w-24 max-w-36 border border-muted-foreground/50 gap-0 flex-col h-auto px-6 py-1 font-bold"
        size="lg"
        variant="secondary"
        onClick={handleResponse(3)}
      >
        <Meh className="w-5" />
        Unsure
      </Button>
      <Button
        variant="destructive"
        className="flex-auto rounded-full min-w-24 max-w-36 gap-0 flex-col h-auto px-6 py-1 font-bold"
        size="lg"
        onClick={handleResponse(1)}
      >
        <Frown className="w-5" />
        Again
      </Button>
    </div>
  )
}
