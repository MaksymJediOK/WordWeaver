import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { UserConfig } from '@shared/types'
import { useEffect, useRef, useState } from 'react'
import { languageSelectOptions } from '@shared/helpers'
import { availableWordsPerPage } from '../../../shared/mocks'
import { Button } from './ui/button'

export const UserConfigSelection = () => {
  const [conf, setConf] = useState<UserConfig>({
    fromLang: '',
    toLang: '',
    wordsPerPage: 20,
    id: 1
  })
  const initialConf = useRef<UserConfig | null>(null)
  const updateConfig = (key: keyof UserConfig, value: string | number) => {
    setConf((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  useEffect(() => {
    ;(async () => {
      try {
        const data = await window.api.getConf()
        console.log(data)
        if (data) {
          setConf(data)
          initialConf.current = data
        }
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  return (
    <div className="container flex flex-col gap-7">
      <p className="font-semibold capitalize">language from which the translation will be made</p>
      <Select onValueChange={(value) => updateConfig('fromLang', value)} value={conf?.fromLang}>
        <SelectTrigger className="w-[80%]">
          <SelectValue placeholder="Select a language you want to translate from" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Languages</SelectLabel>
            {languageSelectOptions.map((option) => (
              <SelectItem value={option.initials} key={option.initials}>
                {option.fullName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <p className="font-semibold capitalize">language into which the translation will be made</p>
      <Select onValueChange={(value) => updateConfig('toLang', value)} value={conf?.fromLang}>
        <SelectTrigger className="w-[80%]">
          <SelectValue placeholder="Select a language you want to translate to" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Languages</SelectLabel>
            {languageSelectOptions.map((option) => (
              <SelectItem value={option.initials} key={option.initials}>
                {option.fullName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <p className="font-semibold capitalize">Size of a page</p>
      <Select
        onValueChange={(value) => updateConfig('wordsPerPage', parseInt(value))}
        value={conf?.wordsPerPage.toString()}
      >
        <SelectTrigger className="w-[80%]">
          <SelectValue placeholder="Select a words quantity per page" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Quantity</SelectLabel>
            {availableWordsPerPage.map((option) => (
              <SelectItem value={option.toString()} key={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button className='w-2/12'>Save</Button>
    </div>
  )
}
