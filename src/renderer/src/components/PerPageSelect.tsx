import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

type PerPageSelectProps = {
  getWords: (page: number, size?: number) => Promise<void>
}

const PerPageSelect = ({ getWords }: PerPageSelectProps) => {
  const handleQuantityChange = async (value: string) => {
    await getWords(1, parseInt(value))
  }
  return (
    <div className="mt-8">
      <Select onValueChange={(value) => handleQuantityChange(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Records per page</SelectLabel>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export { PerPageSelect }
