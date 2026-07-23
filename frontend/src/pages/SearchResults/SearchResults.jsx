import "./SearchResults.css";

import PageHeader from "../../components/common/pageHeader/PageHeader";
import MediaGrid from "../../components/media/mediaGrid/MediaGrid";

/**
 * Displays movie and TV show search results.
 */

function SearchResults() {
    const results = [];

    return (
        <main>
            <PageHeader
                title="Search Results"
                description="Showing matching movies and TV shows."
            />

            <section className="section">
                <div className="container">
                    {results.length > 0 ? (
                        <MediaGrid items={results} />
                    ) : (
                        <p>No search results to display.</p>
                    )}
                </div>
            </section>
        </main>
    );
}

export default SearchResults;
