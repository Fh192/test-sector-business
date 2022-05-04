import { useMemo } from 'react';

interface Params {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
}

export const usePagination = ({
  currentPage,
  totalPages,
  maxVisiblePages = 5,
}: Params) => {
  const startPage: number = useMemo(() => {
    if (currentPage - Math.floor(maxVisiblePages / 2) <= 1) {
      return 1;
    }

    if (currentPage + Math.floor(maxVisiblePages / 2) >= totalPages) {
      return totalPages - maxVisiblePages + 1;
    }

    return currentPage - Math.floor(maxVisiblePages / 2);
  }, [currentPage, maxVisiblePages, totalPages]);

  const pages: number[] = useMemo(() => {
    const length = Math.min(startPage + maxVisiblePages - 1, totalPages);
    return Array.from({ length })
      .map((_, i) => i + 1)
      .splice(startPage - 1);
  }, [startPage, totalPages, maxVisiblePages]);

  const isActive = (page: number): boolean => page === currentPage;

  return { pages, isActive };
};
