import "./TVShowDetails.css";

import MediaHero from "../../components/mediaHero/MediaHero";
import MediaOverview from "../../components/mediaOverview/MediaOverview";

import tvShows from "../../data/tvShows";

/**
 * Displays the details of a selected TV show.
 * Currently uses dummy data.
 */

function TVShowDetails() {
    const show = tvShows[0];

    return (
        <main>
            <MediaHero item={show} />
            <MediaOverview overview={show.overview} />
        </main>
    );
}

export default TVShowDetails;
