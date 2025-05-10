import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { useCallback } from 'react'
import { learningOptions } from '../learning-options'
import { Switch } from '@/components/ui/switch'
import { CircleHelp } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useLearningOption } from '@/components/feature/setting'
import { LearningOptionDropdownVoice } from './learning-option-dropdown-voice'

export const LearningOptionDropdownContent = () => {
  const { autoPlay, setAutoPlay, voiceOnly, setVoiceOnly } = useLearningOption(
    (state) => {
      return state
    },
  )

  const handleChangeAutoPlay = useCallback(
    (checked: boolean) => {
      setAutoPlay(checked)
    },
    [setAutoPlay],
  )
  const handleChangeVoiceOnly = useCallback(
    (checked: boolean) => {
      setVoiceOnly(checked)
    },
    [setVoiceOnly],
  )

  return (
    <DropdownMenuContent>
      <DropdownMenuGroup>
        <DropdownMenuLabel>機能</DropdownMenuLabel>
        <div className="flex flex-row items-center justify-between gap-2 px-2 py-1.5 text-sm">
          <label className="flex flex-row items-center gap-2">
            <Switch
              defaultChecked={voiceOnly}
              onCheckedChange={handleChangeVoiceOnly}
            />
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
            <Switch
              defaultChecked={autoPlay}
              onCheckedChange={handleChangeAutoPlay}
            />
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
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuLabel>音声設定</DropdownMenuLabel>
        <LearningOptionDropdownVoice />
      </DropdownMenuGroup>
    </DropdownMenuContent>
  )
}
