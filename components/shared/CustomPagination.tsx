"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DEFAULT_PAGINATION, SearchParams } from "@/lib/const";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PageSizeSelect } from "./PageSizeSelect";

interface CustomPaginationProps {
  total: number; // total items count
  defaultPageSize?: number;
  pageParam?: string; // default "page"
  sizeParam?: string; // default "size"
  pageSizeOptions?: number[]; // e.g., [10, 20, 50]
}

const CustomPagination = ({
  total,
  defaultPageSize = DEFAULT_PAGINATION.size,
  pageParam = SearchParams.PaginationPage,
  sizeParam = SearchParams.PaginationSize,
  pageSizeOptions = [10, 20, 50],
}: CustomPaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get(pageParam) ?? DEFAULT_PAGINATION.page);
  const size = Number(searchParams.get(sizeParam) ?? defaultPageSize);

  const totalPages = Math.max(1, Math.ceil(total / size));

  const setPage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set(pageParam, String(nextPage));
    params.set(sizeParam, String(size)); // preserve size
    router.replace(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1 && total <= size) return null;

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => page > 1 && setPage(page - 1)}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {/* Pages */}
          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;

            if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
              return (
                <PaginationItem key={p}>
                  <PaginationLink
                    isActive={p === page}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              );
            }

            if (p === page - 2 || p === page + 2) {
              return (
                <PaginationItem key={p}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return null;
          })}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              onClick={() => page < totalPages && setPage(page + 1)}
              className={
                page === totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Page size selector */}
      <PageSizeSelect
        pageSizeOptions={pageSizeOptions}
        pageParam={SearchParams.PaginationPage}
        sizeParam={SearchParams.PaginationSize}
      />
    </div>
  );
};

export default CustomPagination;
