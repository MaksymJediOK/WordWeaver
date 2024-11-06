import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { TableCells } from './TableCells'
import { TableCell } from './ui/table'
import { BaseWord } from '@shared/types'

export const TranslationTable = () => {
  const [tableWords, setTableWords] = useState<BaseWord[]>([])

  useEffect(() => {
    async function getWordsFromDb() {
      try {
        const result = await window.api.getWords()
        if (result) setTableWords(result)

      } catch (err) {
        console.error(err)
      }
    }
    getWordsFromDb()
  }, [])

  return (
    <div className="container mx-auto pt-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[15px]">ID</TableHead>
            <TableHead className="w-[90px]">Original</TableHead>
            <TableHead className="w-[90px]">Translated</TableHead>
            <TableHead className="w-[400px]">Example</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableWords.length ? (
            <TableCells words={tableWords} />
          ) : (
            <TableRow>
              <TableCell className="font-medium"></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
