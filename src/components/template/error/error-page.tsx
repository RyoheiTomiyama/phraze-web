import { Heading } from '@/components/ui/heading'
import { cn } from '@/lib/utils'

type ErrorProps = {
  error?: Error
  title: string
  description: React.ReactNode
}
export const ErrorPage = ({ title, description }: ErrorProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-4 gap-4 h-dvh',
      )}
    >
      <Heading variant="h1">{title}</Heading>

      <div className="text-sm text-muted-foreground text-left inline-flex flex-col items-center">
        {description}
      </div>
    </div>
  )
}
