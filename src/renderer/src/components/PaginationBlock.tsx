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
  console.log('count', count)
//Todo add check for bounds exceed for prev buttons
  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={() => setPage(activePage - 1)} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" onClick={() => setPage(activePage - 1)}>
            {activePage - 1 <= 0 ? null : activePage - 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {activePage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" onClick={() => setPage(activePage + 1)}>
            {activePage + 1 >= count ? null : activePage + 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" onClick={() => setPage(activePage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export { PaginationBlock }
