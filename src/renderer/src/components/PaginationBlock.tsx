import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from './ui/pagination'

type PaginationProps = {
  activePage: number
  count: number
  setPage: (page: number) => void
}

const PaginationBlock = ({ activePage = 1, count, setPage }: PaginationProps) => {
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
          <PaginationEllipsis onClick={() => setPage(count)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" onClick={moveForward} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export { PaginationBlock }
