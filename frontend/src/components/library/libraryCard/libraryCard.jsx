import { Link } from "react-router-dom";

import "./LibraryCard.css";

/**
 * Displays a stored library item and links to its details page.
 */

function LibraryCard({ item }) {
    const isMovie = item.contentType === "movie";

    const detailsPath = isMovie
        ? `/movies/${item.tmdbId}`
        : `/tvshows/${item.tmdbId}`;

    const posterUrl = item.posterPath
        ? `https://image.tmdb.org/t/p/w500${item.posterPath}`
        : null;

    return (
        <Link
            to={detailsPath}
            className="library-card-link"
            aria-label={`View details for ${item.title || "this title"}`}
        >
            <article className="library-card">
                {posterUrl ? (
                    <img
                        src={posterUrl}
                        alt={`${item.title || "Media"} poster`}
                        className="library-card-image"
                    />
                ) : (
                    <div className="library-card-image library-card-placeholder">
                        No image available
                    </div>
                )}

                <div className="library-card-content">
                    <h3 className="library-card-title">
                        {item.title || "Untitled"}
                    </h3>
                </div>
            </article>
        </Link>
    );
}

export default LibraryCard;
