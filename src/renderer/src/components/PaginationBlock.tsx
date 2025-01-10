import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from './ui/pagination'
import { Input } from './ui/input'
import { useState } from 'react'

type PaginationProps = {
  activePage: number
  count: number
  setPage: (page: number) => void
}

const PaginationBlock = ({ activePage = 1, count, setPage }: PaginationProps) => {
  const [jumpPage, setJumpPage] = useState(1)

  const jumpToPage = (page: number) => {
    if (typeof jumpPage === 'number') {
      setPage(page)
    }
  }

  const moveForward = () => {
    if (activePage + 1 <= count) setPage(activePage + 1)
  }
  const moveBack = () => {
    if (activePage - 1 >= 1) setPage(activePage - 1)
  }

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={moveBack} />
        </PaginationItem>
        <PaginationItem></PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {activePage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem></PaginationItem>
        <PaginationItem>
          <Input
            className="w-[60px]"
            placeholder="Jump"
            onChange={(event) => setJumpPage(parseInt(event.target.value))}
            onKeyUp={() => jumpToPage(jumpPage)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" onClick={moveForward} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export { PaginationBlock }
