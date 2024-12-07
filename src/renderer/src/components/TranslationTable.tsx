import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { TableCells } from './TableCells'
import { TableCell } from './ui/table'
import TableSkeleton from './TableSkeleton'
import { PaginationBlock } from './PaginationBlock'
import { FetchState } from '@shared/types'

export const TranslationTable = () => {
  const [tableWords, setTableWords] = useState<FetchState>({ words: [], count: 0 })
  const [currentPage, setCurrentPage] = useState(1)

  const getWordsFromDb = async (page: number, size: number = 6) => {
    try {
      const { data, totalCount } = await window.api.getByPage({ page, size })
      if (data) {
        setTableWords({ words: data, count: Math.ceil(totalCount / size) })
      }
      console.log('it worked')
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getWordsFromDb(currentPage)
  }, [currentPage])

  return (
    <div className="container mx-auto pt-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[90px]">Original</TableHead>
            <TableHead className="w-[90px]">Translated</TableHead>
            <TableHead className="w-[400px]">Example</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableWords.words.length ? (
            <TableCells words={tableWords.words} refresh={() => getWordsFromDb(currentPage)} />
          ) : (
            <TableRow>
              <TableCell>
                <TableSkeleton />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <PaginationBlock activePage={currentPage} count={tableWords.count} setPage={setCurrentPage} />
    </div>
  )
}
