import { Appbar } from '@/components/common/layout'
import { Button } from '@/components/ui/button'
import { pagesPath } from '@/lib/pathpida/$path'
import { ChevronLeft, X } from 'lucide-react'
import { useRouter } from 'next/router'
import { PropsWithChildren, useCallback } from 'react'

export const DeckLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter()

  const handleBack = useCallback(() => {
    router.push(pagesPath.dashboard.$url())
  }, [router])

  const handleClose = useCallback(() => {
    router.push(pagesPath.dashboard.$url())
  }, [router])

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Appbar className="flex-row justify-between">
        <Button
          variant="ghost"
          size="icon"
          className="-ml-3"
          onClick={handleBack}
        >
          <ChevronLeft className="w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="-mr-3"
          onClick={handleClose}
        >
          <X className="w-6" />
        </Button>
      </Appbar>
      <div className="flex-auto flex flex-col gap-4 py-4">{children}</div>
    </div>
  )
}
