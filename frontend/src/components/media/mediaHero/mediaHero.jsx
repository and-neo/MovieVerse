import "./MediaHero.css";

/**
 * Displays the main information of a movie or TV show.
 */
function MediaHero({ item }) {
    const releaseYear = item.releaseDate
        ? new Date(item.releaseDate).getFullYear()
        : "Unknown";

    const rating = Number(item.voteAverage || 0).toFixed(1);
    const voteCount = Number(item.voteCount || 0).toLocaleString();

    const originalLanguage =
        item.originalLanguage && item.originalLanguage !== "N/A"
            ? item.originalLanguage.toUpperCase()
            : "N/A";

    const backdropStyle = item.backdrop
        ? {
              "--backdrop-image": `url(${item.backdrop})`,
          }
        : {};

    return (
        <section
            className={`media-hero ${
                !item.backdrop ? "media-hero-no-backdrop" : ""
            }`}
            style={backdropStyle}
        >
            <div className="container media-hero-content">
                {item.poster ? (
                    <img
                        src={item.poster}
                        alt={`${item.title} poster`}
                        className="media-poster"
                    />
                ) : (
                    <div className="media-poster media-poster-placeholder">
                        MovieVerse
                    </div>
                )}

                <div className="media-info">
                    <h1 className="media-title">{item.title}</h1>

                    {item.tagline && (
                        <p className="media-tagline">{item.tagline}</p>
                    )}

                    {item.genres.length > 0 && (
                        <div className="media-genres">
                            {item.genres.map((genre) => (
                                <span key={genre} className="media-genre">
                                    {genre}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="media-details">
                        <span>⭐ {rating}</span>
                        <span>{voteCount} votes</span>
                        <span>{releaseYear}</span>

                        {item.runtime && <span>{item.runtime} min</span>}

                        {item.seasons && (
                            <span>
                                {item.seasons}{" "}
                                {item.seasons === 1 ? "Season" : "Seasons"}
                            </span>
                        )}
                    </div>

                    <div className="media-secondary-details">
                        <span>Status: {item.status}</span>
                        <span>Language: {originalLanguage}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MediaHero;
