import "./MovieDetails.css";

import MediaHero from "../../components/mediaHero/MediaHero";
import MediaOverview from "../../components/mediaOverview/MediaOverview";

import movies from "../../data/movies";

/**
 * Displays the details of a selected movie.
 * Currently uses dummy data.
 */

function MovieDetails() {
    const movie = movies[0];

    return (
        <main>
            <MediaHero item={movie} />
            <MediaOverview overview={movie.overview} />
        </main>
    );
}

export default MovieDetails;
