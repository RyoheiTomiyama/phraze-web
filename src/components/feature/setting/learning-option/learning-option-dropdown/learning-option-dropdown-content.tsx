import { DropdownMenuContent } from '@/components/ui/dropdown-menu'
import React from 'react'
import { learningOptions } from '../learning-options'
import { Switch } from '@/components/ui/switch'
import { CircleHelp } from 'lucide-react'

export const LearningOptionDropdownContent = () => {
  return (
    <DropdownMenuContent>
      <label className="flex flex-row items-center gap-2 px-2 py-1.5 text-sm">
        <div className="flex flex-row items-center gap-2">
          <Switch />
          {learningOptions.voiceOnly.name}
        </div>
        <CircleHelp className="w-4 h-4" />
      </label>
      <label className="flex flex-row items-center gap-2 px-2 py-1.5 text-sm">
        <Switch />
        {learningOptions.autoPlay.name}
      </label>
    </DropdownMenuContent>
  )
}
