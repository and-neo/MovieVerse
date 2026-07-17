import "./MediaCard.css";

import { Link } from "react-router-dom";

/**
 * Displays a single media card.
 * Receives a media item through props and renders its basic information.
 */

function MediaCard({ item }) {
    const detailsPath =
        item.type === "movie" ? `/movies/${item.id}` : `/tvshows/${item.id}`;

    const releaseYear = new Date(item.releaseDate).getFullYear();

    return (
        <Link to={detailsPath}>
            <article className="media-card">
                <img
                    src={item.poster}
                    alt={item.title}
                    className="media-card-image"
                />

                <div className="media-card-content">
                    <h3 className="media-card-title">{item.title}</h3>

                    <p className="media-card-rating">
                        ⭐ {item.voteAverage.toFixed(1)}
                    </p>

                    <p className="media-card-meta">
                        {item.genres.slice(0, 2).join(" • ")} • {releaseYear}
                    </p>
                </div>
            </article>
        </Link>
    );
}

export default MediaCard;
