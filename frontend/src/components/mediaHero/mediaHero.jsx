import "./MediaHero.css";

/**
 * Displays the main information of a movie or TV show.
 */

function MediaHero({ item }) {
    const releaseYear = new Date(item.releaseDate).getFullYear();

    return (
        <section
            className="media-hero"
            style={{
                "--backdrop-image": `url(${item.backdrop})`,
            }}
        >
            <div className="container media-hero-content">
                <img
                    src={item.poster}
                    alt={`${item.title} poster`}
                    className="media-poster"
                />

                <div className="media-info">
                    <h1 className="media-title">{item.title}</h1>

                    {item.tagline && (
                        <p className="media-tagline">{item.tagline}</p>
                    )}

                    <div className="media-genres">
                        {item.genres.map((genre) => (
                            <span key={genre} className="media-genre">
                                {genre}
                            </span>
                        ))}
                    </div>

                    <div className="media-details">
                        <span>⭐ {item.voteAverage.toFixed(1)}</span>
                        <span>{item.voteCount.toLocaleString()} votes</span>
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
                        <span>
                            Language: {item.originalLanguage.toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MediaHero;
