import { DropdownMenuContent } from '@/components/ui/dropdown-menu'
import React from 'react'
import { learningOptions } from '../learning-options'
import { Switch } from '@/components/ui/switch'

export const LearningOptionDropdownContent = () => {
  return (
    <DropdownMenuContent>
      <label className="flex flex-row items-center gap-2 px-2 py-1.5 text-sm">
        <Switch />
        {learningOptions.voiceOnly.name}
      </label>
      <label className="flex flex-row items-center gap-2 px-2 py-1.5 text-sm">
        <Switch />
        {learningOptions.autoPlay.name}
      </label>
    </DropdownMenuContent>
  )
}
