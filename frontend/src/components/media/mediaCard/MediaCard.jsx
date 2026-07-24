import { Link } from "react-router-dom";

import "./MediaCard.css";

/**
 * Displays a single normalized media item.
 */
function MediaCard({ item }) {
    const detailsPath =
        item.type === "movie" ? `/movies/${item.id}` : `/tvshows/${item.id}`;

    const releaseYear = item.releaseDate
        ? new Date(item.releaseDate).getFullYear()
        : null;

    const rating = Number(item.voteAverage || 0).toFixed(1);

    const genres = Array.isArray(item.genres)
        ? item.genres.slice(0, 2).join(" • ")
        : "";

    const metadata = [genres, releaseYear].filter(Boolean).join(" • ");

    return (
        <Link to={detailsPath} className="media-card-link">
            <article className="media-card">
                {item.poster ? (
                    <img
                        src={item.poster}
                        alt={`${item.title || "Media"} poster`}
                        className="media-card-image"
                    />
                ) : (
                    <div className="media-card-image media-card-placeholder">
                        No image available
                    </div>
                )}

                <div className="media-card-content">
                    <h3 className="media-card-title">
                        {item.title || "Untitled"}
                    </h3>

                    <p className="media-card-rating">⭐ {rating}</p>

                    {metadata && <p className="media-card-meta">{metadata}</p>}
                </div>
            </article>
        </Link>
    );
}

export default MediaCard;
