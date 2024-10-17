import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PageInfoOnCardTablePaginationFragment } from './card-table-pagination.generated'
import { useEffect, useMemo, useRef } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

type CardTablePaginationProps = {
  limit: number
  offset: number
  totalCount: PageInfoOnCardTablePaginationFragment['totalCount']
}

export const CardTablePagination = ({
  limit = 1,
  offset = 0,
  totalCount = 10,
}: CardTablePaginationProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const { page, pageCount } = useMemo(() => {
    // 現在のページ数０から
    const page = Math.max(0, Math.floor(offset / limit))
    // 総ページ数
    const pageCount = Math.max(0, Math.ceil(totalCount / limit))

    if (page > pageCount - 1) {
      return { page: pageCount, pageCount }
    }

    return { page, pageCount }
  }, [limit, offset, totalCount])

  useEffect(() => {
    const content = scrollAreaRef.current?.querySelector('& > div')
    if (!content) {
      return
    }

    const li = content.querySelector<HTMLLIElement>(`li:nth-child(${page + 1})`)
    if (!li) {
      return
    }

    content.scrollTo({ behavior: 'smooth', left: li.offsetLeft - 80 })
  }, [page])

  return (
    <Pagination className="max-w-80 overflow-hidden">
      <PaginationContent className="overflow-hidden">
        <PaginationItem>
          <Button
            data-disabled={!(page > 0)}
            variant="ghost"
            className="data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            asChild
          >
            <Link href="#">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
        </PaginationItem>
        <li className="flex-initial overflow-x-hidden">
          <ScrollArea ref={scrollAreaRef}>
            <ul className="flex flex-row items-center gap-1">
              {Array(pageCount)
                .fill(0)
                .map((_, index) => {
                  return (
                    <PaginationItem key={index}>
                      <Button
                        variant={index === page ? 'outline' : 'ghost'}
                        asChild
                      >
                        <Link href="#">{index + 1}</Link>
                      </Button>
                    </PaginationItem>
                  )
                })}
            </ul>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </li>
        <PaginationItem>
          <Button
            disabled={!(page < pageCount - 1)}
            variant="ghost"
            className="data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            asChild
          >
            <Link href="#">
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
