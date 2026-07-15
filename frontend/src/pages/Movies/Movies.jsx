import "./Movies.css";

import PageHeader from "../../components/pageHeader/PageHeader";
import MediaGrid from "../../components/mediaGrid/MediaGrid";
import Pagination from "../../components/pagination/Pagination";

import movies from "../../data/movies";

/**
 * Displays the Movies page.
 */

function Movies() {
    return (
        <main>
            <PageHeader
                title="Movies"
                description="Browse the most popular movies and discover your next favorite film."
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

export default Movies;
