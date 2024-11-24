import { DropdownMenuContent } from '@/components/ui/dropdown-menu'
import React from 'react'
import { learningOptions } from '../learning-options'
import { Switch } from '@/components/ui/switch'
import { CircleHelp } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export const LearningOptionDropdownContent = () => {
  return (
    <DropdownMenuContent>
      <div className="flex flex-row items-center justify-between gap-2 px-2 py-1.5 text-sm">
        <label className="flex flex-row items-center gap-2">
          <Switch />
          {learningOptions.voiceOnly.name}
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <CircleHelp className="w-4 h-4" />
          </PopoverTrigger>
          <PopoverContent className="text-sm" sideOffset={16}>
            {learningOptions.voiceOnly.description}
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-row items-center justify-between gap-2 px-2 py-1.5 text-sm">
        <label className="flex flex-row items-center gap-2">
          <Switch />
          {learningOptions.autoPlay.name}
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <CircleHelp className="w-4 h-4" />
          </PopoverTrigger>
          <PopoverContent className="text-sm" sideOffset={16}>
            {learningOptions.autoPlay.description}
          </PopoverContent>
        </Popover>
      </div>
    </DropdownMenuContent>
  )
}
