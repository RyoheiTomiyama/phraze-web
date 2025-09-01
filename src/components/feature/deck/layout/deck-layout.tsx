import { Appbar } from '@/components/common/layout'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { pagesPath } from '@/lib/pathpida/$path'
import { ChevronLeft, Settings2, X } from 'lucide-react'
import { useRouter } from 'next/router'
import { PropsWithChildren, useCallback } from 'react'
import { LearningOptionDropdownContent } from '../../setting'

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
          <ChevronLeft className="size-5" />
        </Button>

        <div className="flex flex-row">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <Settings2 className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <LearningOptionDropdownContent />
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            className="-mr-3"
            onClick={handleClose}
          >
            <X className="size-5" />
          </Button>
        </div>
      </Appbar>
      <div className="flex-auto flex flex-col gap-4 py-4">{children}</div>
    </div>
  )
}
