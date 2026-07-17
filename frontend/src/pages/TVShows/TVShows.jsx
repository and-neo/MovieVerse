import "./TVShows.css";

import PageHeader from "../../components/common/pageHeader/PageHeader";
import MediaGrid from "../../components/media/mediaGrid/MediaGrid";
import Pagination from "../../components/pagination/Pagination";

import tvShows from "../../data/tvShows";

/**
 * Displays the TV Shows page.
 */

function TVShows() {
    return (
        <main>
            <PageHeader
                title="TV Shows"
                description="Discover popular television series from around the world."
            />

            <section className="section">
                <div className="container">
                    <MediaGrid items={tvShows} />

                    <Pagination />
                </div>
            </section>
        </main>
    );
}

export default TVShows;
