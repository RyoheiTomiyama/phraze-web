import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { getVoices, onVoicesChanged, Voice } from '@/lib/webSpeech'
import { ChevronsUpDown, Check } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useLearningOption } from '@/components/feature/setting'
import { useTextToSpeech } from '@/hook/useTextToSpeech'

export const LearningOptionDropdownVoice = () => {
  const [voices, setVoices] = useState(sortVoices(getVoices()))
  const [open, setOpen] = useState(false)

  const { voice: currentVoice, setVoice } = useLearningOption((state) => {
    return state
  })

  const { speak } = useTextToSpeech({ voice: currentVoice })

  useEffect(() => {
    onVoicesChanged((voices) => {
      setVoices(sortVoices(voices))
    })
  }, [])

  const handleSelect = useCallback(
    (value: string) => {
      if (currentVoice?.voiceURI === value) {
        setVoice(undefined)
      } else {
        const selected = voices.find((v) => {
          return v.voiceURI === value
        })
        setVoice(selected)
        if (selected) {
          speak('This is a sample voice.', selected)
        }
      }
    },
    [currentVoice?.voiceURI, setVoice, speak, voices],
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <p className="flex-auto overflow-hidden text-ellipsis text-left">
            {currentVoice
              ? `${getFlagEmoji(currentVoice.lang)} ${currentVoice.name}`
              : '音声を選択してください...'}
          </p>
          <ChevronsUpDown className="h-4 w-4 flex-[0_0_auto] opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 pointer-events-auto">
        <Command>
          <CommandInput placeholder="Search voice..." />
          <CommandList>
            <CommandEmpty>No voice found.</CommandEmpty>
            <CommandGroup>
              {voices.map((voice) => {
                return (
                  <CommandItem
                    key={voice.voiceURI}
                    value={voice.voiceURI}
                    onSelect={handleSelect}
                    className="text-sm"
                  >
                    {getFlagEmoji(voice.lang)} {voice.name}
                    <Check
                      className={cn(
                        'ml-auto',
                        currentVoice?.voiceURI === voice.voiceURI
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

// マッピング対象: "en-US", "ja-JP" などの言語コード
function getFlagEmoji(langCode: string): string {
  // ISO地域コードだけ取り出す（例: "en-US" → "US"）
  const parts = langCode.split('-')
  const regionCode = parts[1]?.toUpperCase()

  if (!regionCode || regionCode.length !== 2) {
    return '🌐' // 汎用アイコン
  }

  // 国コードから国旗に変換
  const codePoints = regionCode.split('').map((char) => {
    return 127397 + char.charCodeAt(0)
  })
  return String.fromCodePoint(...codePoints)
}

function sortVoices(voices: Voice[]): Voice[] {
  return voices.toSorted((a, b) => {
    // If languages are the same, sort by name
    if (a.lang === b.lang) {
      return a.name.localeCompare(b.name)
    }

    // Priority order: en-US, en-GB, others
    if (a.lang === 'en-US') {
      return -1
    }
    if (b.lang === 'en-US') {
      return 1
    }
    if (a.lang === 'en-GB') {
      return -1
    }
    if (b.lang === 'en-GB') {
      return 1
    }

    // For all other languages, sort alphabetically by language code
    return a.lang.localeCompare(b.lang)
  })
}
