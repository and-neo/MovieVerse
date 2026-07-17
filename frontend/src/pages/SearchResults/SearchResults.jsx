import "./SearchResults.css";

import PageHeader from "../../components/common/pageHeader/PageHeader";
import MediaGrid from "../../components/media/mediaGrid/MediaGrid";
import Pagination from "../../components/pagination/Pagination";

import movies from "../../data/movies";

/**
 * Displays search results.
 * Currently uses dummy data.
 */

function SearchResults() {
    return (
        <main>
            <PageHeader
                title="Search Results"
                description="Showing matching movies and TV shows."
            />

            <section className="section">
                <div className="container">
                    <MediaGrid items={movies} />

                    <Pagination />
                </div>
            </section>
        </main>
    );
}

export default SearchResults;
