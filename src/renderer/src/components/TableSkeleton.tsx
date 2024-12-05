import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const TableSkeleton = () => {
  return (
    <div className='flex flex-col gap-8'>
      <Skeleton className="h-[30px] w-[500px]" />
      <Skeleton className="h-[30px] w-[500px]" />
      <Skeleton className="h-[30px] w-[500px]" />
    </div>
  )
}

export default TableSkeleton
