import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { TableRecord } from './TableRecord'
import { TableCell } from './ui/table'
import { TableSkeleton } from './TableSkeleton'
import { PaginationBlock } from './PaginationBlock'
import { FetchState } from '@shared/types'
import { PerPageSelect } from './PerPageSelect'

export const TranslationTable = () => {
  const [tableWords, setTableWords] = useState<FetchState>({ words: [], count: 0 })
  const [currentPage, setCurrentPage] = useState(1)

  const getWordsFromDb = async (page: number, size: number = 10) => {
    try {
      const { data, totalCount } = await window.api.getByPage({ page, size })
      console.log('totalCount', totalCount)
      if (data) {
        setTableWords({ words: data, count: Math.ceil(totalCount / size) })
      }
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
            tableWords.words.map((word) => (
              <TableRecord word={word} refresh={() => getWordsFromDb(currentPage)} key={word.id} />
            ))
          ) : (
            <TableRow>
              <TableCell>
                <TableSkeleton />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex gap-4 items-center">
        <PaginationBlock
          activePage={currentPage}
          count={tableWords.count}
          setPage={setCurrentPage}
        />
        {/*<PerPageSelect getWords={getWordsFromDb} />*/}
      </div>
    </div>
  )
}
