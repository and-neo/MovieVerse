import "./PageHeader.css";

/**
 * Displays the title and description of a page.
 */

function PageHeader({ title, description }) {
    return (
        <header className="page-header">
            <div className="container">
                <div className="page-header-content">
                    <h1 className="page-title">{title}</h1>

                    <p className="page-description">{description}</p>
                </div>
            </div>
        </header>
    );
}

export default PageHeader;
