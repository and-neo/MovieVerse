import "./Pagination.css";

/**
 * Displays pagination controls.
 */

function Pagination({ currentPage, totalPages, onPrevious, onNext }) {
    const isPreviousDisabled = currentPage <= 1;
    const isNextDisabled = currentPage >= totalPages;

    return (
        <nav className="pagination" aria-label="Movies pagination">
            <button
                type="button"
                className="pagination-button"
                onClick={onPrevious}
                disabled={isPreviousDisabled}
            >
                Previous
            </button>

            <span className="pagination-current">
                Page {currentPage} of {totalPages}
            </span>

            <button
                type="button"
                className="pagination-button"
                onClick={onNext}
                disabled={isNextDisabled}
            >
                Next
            </button>
        </nav>
    );
}

export default Pagination;
