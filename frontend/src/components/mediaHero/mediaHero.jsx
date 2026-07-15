import "./MediaHero.css";

/**
 * Hero section displayed on the Movie and TV Shows details pages..
 */

function MediaHero({ item }) {
    return (
        <section className="media-hero">
            <div className="container media-hero-content">
                <img
                    src={item.poster}
                    alt={item.title}
                    className="media-poster"
                />

                <div className="media-info">
                    <h1>{item.title}</h1>

                    <p className="media-rating">⭐ {item.rating}</p>

                    <p className="media-meta">
                        {item.genre} • {item.year}
                    </p>

                    <p className="media-overview">{item.overview}</p>
                </div>
            </div>
        </section>
    );
}

export default MediaHero;
