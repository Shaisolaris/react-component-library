"use client";
import { useMemo, type MouseEvent } from "react";
import { cn } from "../../utils/index.js";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
  showFirstLast?: boolean;
}

function generateRange(start: number, end: number): (number | "...")[] {
  const range: (number | "...")[] = [];
  for (let i = start; i <= end; i++) range.push(i);
  return range;
}

export function Pagination({ currentPage, totalPages, onPageChange, siblingCount = 1, className, showFirstLast = true }: PaginationProps) {
  const pages = useMemo(() => {
    const totalNumbers = siblingCount * 2 + 5; // siblings + first + last + current + 2 dots
    if (totalNumbers >= totalPages) return generateRange(1, totalPages);

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);
    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      const leftRange = generateRange(1, 3 + 2 * siblingCount);
      return [...leftRange, "..." as const, totalPages];
    }
    if (showLeftDots && !showRightDots) {
      const rightRange = generateRange(totalPages - (2 + 2 * siblingCount), totalPages);
      return [1, "..." as const, ...rightRange];
    }
    return [1, "..." as const, ...generateRange(leftSibling, rightSibling), "..." as const, totalPages];
  }, [currentPage, totalPages, siblingCount]);

  const handleClick = (page: number) => (e: MouseEvent) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages) onPageChange(page);
  };

  return (
    <nav className={cn("sui-pagination", className)} aria-label="Pagination">
      {showFirstLast && (
        <button className="sui-pagination-btn" onClick={handleClick(1)} disabled={currentPage === 1} aria-label="First page">«</button>
      )}
      <button className="sui-pagination-btn" onClick={handleClick(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous page">‹</button>

      {pages.map((page, i) => {
        if (page === "...") return <span key={`dots-${i}`} className="sui-pagination-dots">…</span>;
        return (
          <button
            key={page}
            className={cn("sui-pagination-btn", currentPage === page && "sui-pagination-active")}
            onClick={handleClick(page)}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      <button className="sui-pagination-btn" onClick={handleClick(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Next page">›</button>
      {showFirstLast && (
        <button className="sui-pagination-btn" onClick={handleClick(totalPages)} disabled={currentPage === totalPages} aria-label="Last page">»</button>
      )}
    </nav>
  );
}
