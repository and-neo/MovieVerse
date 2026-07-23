import { Link } from "react-router-dom";

import "./MediaCard.css";

/**
 * Displays a single media card.
 * Receives a normalized media item through props.
 */

function MediaCard({ item }) {
    const detailsPath =
        item.type === "movie" ? `/movies/${item.id}` : `/tvshows/${item.id}`;

    const releaseYear = item.releaseDate
        ? new Date(item.releaseDate).getFullYear()
        : "Unknown";

    const rating = Number(item.voteAverage || 0).toFixed(1);

    return (
        <Link to={detailsPath}>
            <article className="media-card">
                {item.poster ? (
                    <img
                        src={item.poster}
                        alt={`${item.title} poster`}
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

                    <p className="media-card-meta">
                        {item.genres.slice(0, 2).join(" • ")} • {releaseYear}
                    </p>
                </div>
            </article>
        </Link>
    );
}

export default MediaCard;
