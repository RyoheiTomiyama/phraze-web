import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical'
import { Bold } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useSelectionChangeListener } from './use-selection-change-listener'
import { Toggle } from '@/components/ui/toggle'
import { cn } from '@/lib/utils'

type ToolBoldProps = {
  showLabel?: true
}
export const ToolBold = ({ showLabel }: ToolBoldProps) => {
  const [isActive, setIsActive] = useState(false)
  const [editor] = useLexicalComposerContext()

  useSelectionChangeListener(() => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) {
      return
    }
    setIsActive(selection.hasFormat('bold'))
  })

  const handleBold = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
  }, [editor])

  return (
    <Toggle
      pressed={isActive}
      className={cn('gap-1 font-bold', !isActive && 'text-muted-foreground')}
      onClick={handleBold}
    >
      <Bold className="h-4 w-4" strokeWidth={isActive ? 3 : 2} />
      {showLabel && 'Bold'}
    </Toggle>
  )
}
