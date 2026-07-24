import LibraryCard from "../LibraryCard/LibraryCard";

import "./LibrarySection.css";

/**
 * Displays a collection of stored library items.
 */
function LibrarySection({ title, items, emptyMessage }) {
    return (
        <section className="library-section">
            <div className="library-section-header">
                <h2 className="library-section-title">{title}</h2>

                <span className="library-section-count">{items.length}</span>
            </div>

            {items.length > 0 ? (
                <div className="library-section-grid">
                    {items.map((item) => (
                        <LibraryCard
                            key={`${item.contentType}-${item.tmdbId}`}
                            item={item}
                        />
                    ))}
                </div>
            ) : (
                <p className="library-section-empty">{emptyMessage}</p>
            )}
        </section>
    );
}

export default LibrarySection;
