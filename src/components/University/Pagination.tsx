import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./Pagination.module.scss";

/** Sentinel page size meaning "render every item on one page". */
export const ALL_ITEMS = -1;

/** Page sizes offered in the selector, in display order. */
export const PAGE_SIZE_OPTIONS: number[] = [10, 25, 50, ALL_ITEMS];

export const DEFAULT_PAGE_SIZE = 10;

/** Smallest real page size, below which no control is worth showing. */
const MIN_PAGE_SIZE = Math.min(
  ...PAGE_SIZE_OPTIONS.filter((size) => size !== ALL_ITEMS)
);

const pageSizeLabel = (size: number) =>
  size === ALL_ITEMS ? "All" : String(size);

/** Marker for a gap in the page-number strip. */
const ELLIPSIS = "ellipsis" as const;

type PageEntry = number | typeof ELLIPSIS;

/**
 * Page numbers to render: always the first and last page, the current page and
 * its immediate neighbours, and an ellipsis wherever the run is broken. Keeps
 * the strip a fixed width no matter how many pages exist.
 */
function getPageEntries(page: number, totalPages: number): PageEntry[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const entries: PageEntry[] = [1];

  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);

  if (start > 2) {
    entries.push(ELLIPSIS);
  }

  for (let current = start; current <= end; current += 1) {
    entries.push(current);
  }

  if (end < totalPages - 1) {
    entries.push(ELLIPSIS);
  }

  entries.push(totalPages);

  return entries;
}

export type PaginationState<T> = {
  page: number;
  totalPages: number;
  /** The slice of items belonging to the current page. */
  pageItems: T[];
  /** Total number of items across all pages. */
  totalItems: number;
  /** The reader's selection, which may be the `ALL_ITEMS` sentinel. */
  pageSize: number;
  /** `pageSize` resolved to a real count, so `ALL_ITEMS` becomes the list length. */
  effectivePageSize: number;
  goToPage: (page: number) => void;
  setPageSize: (size: number) => void;
  /** Attach to the tile grid so page changes scroll it back into view. */
  gridRef: React.RefObject<HTMLDivElement>;
};

/**
 * Slice `items` into pages. `resetKey` returns the reader to page 1 whenever the
 * underlying selection changes (module filter, certification tab), so a filter
 * change never lands them mid-list. The page size itself survives those changes.
 */
export function usePagination<T>(
  items: T[],
  resetKey: string,
  initialPageSize: number = DEFAULT_PAGE_SIZE
): PaginationState<T> {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(initialPageSize);
  const gridRef = useRef<HTMLDivElement>(null);

  // Guard against a zero divisor when "All" is selected on an empty list.
  const effectivePageSize =
    pageSize === ALL_ITEMS ? Math.max(items.length, 1) : pageSize;

  const totalPages = Math.max(1, Math.ceil(items.length / effectivePageSize));

  useEffect(() => {
    setPage(1);
  }, [resetKey]);

  // The list can shrink without `resetKey` changing (for example a data update),
  // so clamp rather than trust the stored page.
  useEffect(() => {
    setPage((current) => Math.min(current, totalPages));
  }, [totalPages]);

  const safePage = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * effectivePageSize;
    return items.slice(start, start + effectivePageSize);
  }, [items, safePage, effectivePageSize]);

  const scrollGridIntoView = () => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    gridRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const goToPage = (next: number) => {
    const clamped = Math.min(Math.max(next, 1), totalPages);
    if (clamped === safePage) {
      return;
    }
    setPage(clamped);
    scrollGridIntoView();
  };

  const setPageSize = (size: number) => {
    if (size === pageSize) {
      return;
    }
    setPageSizeState(size);
    // A different size renumbers every page, so the stored page no longer maps
    // to the same tiles. Start over at the top of the list.
    setPage(1);
    scrollGridIntoView();
  };

  return {
    page: safePage,
    totalPages,
    pageItems,
    totalItems: items.length,
    pageSize,
    effectivePageSize,
    goToPage,
    setPageSize,
    gridRef,
  };
}

type PageSizeSelectProps = {
  pageSize: number;
  onChange: (size: number) => void;
};

/**
 * Compact dropdown for the page size. Mirrors the button-plus-listbox pattern in
 * `ModuleFilter` (including the outside-click and Escape handling) so the two
 * controls behave identically.
 */
function PageSizeSelect({ pageSize, onChange }: PageSizeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxId = `page-size-${useId()}`;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (size: number) => {
    onChange(size);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div className={styles.pageSize} ref={containerRef}>
      <span className={styles.pageSizeLabel} id={`${listboxId}-label`}>
        Show
      </span>
      <div className={styles.pageSizeContainer}>
        <button
          type="button"
          ref={buttonRef}
          className={styles.pageSizeHeader}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listboxId : undefined}
          aria-labelledby={`${listboxId}-label`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={styles.pageSizeValue}>{pageSizeLabel(pageSize)}</span>
          <i
            className={clsx(
              "fa-solid",
              isOpen ? "fa-chevron-up" : "fa-chevron-down"
            )}
          ></i>
        </button>
        {isOpen && (
          <ul className={styles.pageSizeList} id={listboxId} role="listbox">
            {PAGE_SIZE_OPTIONS.map((size) => (
              <li
                key={size}
                role="option"
                aria-selected={size === pageSize}
                tabIndex={0}
                className={clsx({ [styles.selected]: size === pageSize })}
                onClick={() => handleSelect(size)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleSelect(size);
                  }
                }}
              >
                {pageSizeLabel(size)}
              </li>
            ))}
          </ul>
        )}
      </div>
      <span className={styles.pageSizeSuffix}>per page</span>
    </div>
  );
}

type PaginationProps<T> = PaginationState<T> & {
  /** Plural noun for the summary line, for example "courses". */
  itemLabel?: string;
};

export default function Pagination<T>({
  page,
  totalPages,
  totalItems,
  pageSize,
  effectivePageSize,
  goToPage,
  setPageSize,
  itemLabel = "results",
}: PaginationProps<T>) {
  // Below the smallest offered size there is nothing to page through and no
  // size worth choosing, so the whole bar stays out of the way.
  if (totalItems <= MIN_PAGE_SIZE) {
    return null;
  }

  const firstItem = (page - 1) * effectivePageSize + 1;
  const lastItem = Math.min(page * effectivePageSize, totalItems);

  return (
    <div className={styles.pagination}>
      {/* A `span`, not a `p`: `.tabs p` in `styles.module.scss` forces a 32px
          bottom margin that would knock this out of line with the controls. */}
      <span className={styles.summary}>
        {pageSize === ALL_ITEMS
          ? `Showing all ${totalItems} ${itemLabel}`
          : `Showing ${firstItem}-${lastItem} of ${totalItems} ${itemLabel}`}
      </span>
      <PageSizeSelect pageSize={pageSize} onChange={setPageSize} />
      {/* With "All" selected there is a single page, so the strip is hidden but
          the size selector above stays available to switch back. */}
      {totalPages > 1 && (
        <nav className={styles.controls} aria-label="Pagination">
          <button
            type="button"
            className={styles.arrow}
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            aria-label="Go to previous page"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <ul className={styles.pages}>
            {getPageEntries(page, totalPages).map((entry, index) =>
              entry === ELLIPSIS ? (
                <li
                  key={`${ELLIPSIS}-${index}`}
                  className={styles.ellipsis}
                  aria-hidden="true"
                >
                  &hellip;
                </li>
              ) : (
                <li key={entry}>
                  <button
                    type="button"
                    className={clsx(styles.page, {
                      [styles.active]: entry === page,
                    })}
                    onClick={() => goToPage(entry)}
                    aria-current={entry === page ? "page" : undefined}
                    aria-label={`Go to page ${entry}`}
                  >
                    {entry}
                  </button>
                </li>
              )
            )}
          </ul>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            aria-label="Go to next page"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </nav>
      )}
    </div>
  );
}
