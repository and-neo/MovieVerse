import "./MediaCard.css";

import { Link } from "react-router-dom";

/**
 * Displays a single media card.
 * Receives a media item through props and renders its basic information.
 */

function MediaCard({ item }) {
    return (
        <Link to={`/movies/${item.id}`}>
            <article className="media-card">
                <img
                    src={item.poster}
                    alt={item.title}
                    className="media-card-image"
                />

                <div className="media-card-content">
                    <h3 className="media-card-title">{item.title}</h3>

                    <p className="media-card-rating">⭐ {item.rating}</p>

                    <p className="media-card-meta">
                        {item.genre} • {item.year}
                    </p>
                </div>
            </article>
        </Link>
    );
}

export default MediaCard;
