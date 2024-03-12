import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui'
import { useMemo } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom';

type Props = {
  length: number;
}

const Paginator = ({ length }: Props) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const currentPage = Number(searchParams.get("page") || 1);


  const createPageUrl = (pageNumber: number | string) => {
    if (Number(pageNumber) < 1 || Number(pageNumber) > length)
      return `${location.pathname}${location.search}`;
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${location.pathname}?${params.toString()}`;
  }

  const GetSlice = useMemo(() => {
    const min = Math.max(length - currentPage <= 2 ? currentPage - 4 + (length - currentPage) : currentPage - 2, 1);
    const max = Math.min(currentPage <= 2 ? 6: currentPage + 3, length + 1);
    return [min, max]
  }, [currentPage, length])

  return (
    typeof length == "number" &&
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious to={createPageUrl(currentPage - 1)} />
        </PaginationItem>
        <PaginationItem>
          {
            [...Array(length + 1)].map((_, i) => i)
              .slice(GetSlice[0], GetSlice[1])
              .map((v) => (
                <PaginationLink key={v} to={createPageUrl(v)}>{v}</PaginationLink>
              ))
          }

        </PaginationItem>
        <PaginationItem>
          <PaginationNext to={createPageUrl(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>

  )
}

export default Paginator