// components/Pagination.tsx
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  const pagesToShow = Array.from({ length: totalPages }, (_, i) => i).filter(
    (i) => Math.abs(i - currentPage) <= 2
  );

  return (
    <div className="flex flex-col items-center gap-4 pt-6">
      <p className="text-sm">
        Page {currentPage + 1} of {totalPages}
      </p>

      <div className="flex flex-wrap justify-center gap-2">
        {currentPage > 2 && (
          <>
            <button
              onClick={() => onPageChange(0)}
              className="px-3 py-1 rounded border text-sm bg-[#2b7c85] text-white"
            >
              First
            </button>
            <span>...</span>
          </>
        )}

        {pagesToShow.map((i) => (
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-3 py-1 rounded border text-sm ${
              i === currentPage
                ? "bg-[#0c1446] text-white"
                : "bg-[#87aca3] text-[#0c1446] hover:bg-[#2b7c85] hover:text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}

        {currentPage < totalPages - 3 && (
          <>
            <span>...</span>
            <button
              onClick={() => onPageChange(totalPages - 1)}
              className="px-3 py-1 rounded border text-sm bg-[#2b7c85] text-white"
            >
              Last
            </button>
          </>
        )}
      </div>

      <div className="flex gap-4 pt-2">
        {!isFirstPage && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="px-4 py-2 rounded text-white transition-colors bg-[#2b7c85] hover:bg-[#0c1446]"
          >
            Previous
          </button>
        )}
        {!isLastPage && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="px-4 py-2 rounded text-white transition-colors bg-[#2b7c85] hover:bg-[#0c1446]"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
