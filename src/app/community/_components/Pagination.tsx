import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 text-gray-500 disabled:opacity-40"
      >
        <ChevronLeft size={20} />
      </button>

      {pageNumbers.map((page, idx) => (
        <button
          key={idx}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`w-8 h-8 flex items-center justify-center rounded-md text-sm
            ${
              page === currentPage
                ? "bg-primary text-white"
                : "text-gray-800 hover:bg-gray-200"
            }
          `}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 text-gray-500 disabled:opacity-40"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
