import "./MovieCard.css";

/**
 * Displays a single movie card.
 * Receives movie information through props.
 */

function MovieCard({ movie }) {
    return (
        <article className="movie-card">
            <img
                src={movie.poster}
                alt={movie.title}
                className="movie-card-image"
            />

            <div className="movie-card-content">
                <h3 className="movie-card-title">{movie.title}</h3>

                <p className="movie-card-rating">⭐ {movie.rating}</p>

                <p className="movie-card-meta">
                    {movie.genre} • {movie.year}
                </p>
            </div>
        </article>
    );
}

export default MovieCard;
