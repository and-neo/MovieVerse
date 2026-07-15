import "./Pagination.css";

/**
 * Displays pagination controls.
 * Functionality will be added later.
 */

function Pagination() {
    return (
        <nav className="pagination">
            <button className="pagination-button">Previous</button>

            <span className="pagination-current">Page 1</span>

            <button className="pagination-button">Next</button>
        </nav>
    );
}

export default Pagination;
