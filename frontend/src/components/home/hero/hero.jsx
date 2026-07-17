import "./Hero.css";

/**
 * Hero section displayed on the home page.
 */

function Hero() {
    return (
        <section className="hero">
            <div className="container hero-content">
                <h1>Welcome to MovieVerse.</h1>
                <p>
                    Browse thousands of movies and TV shows, discover trending
                    titles and build your own watchlist.
                </p>
            </div>
        </section>
    );
}

export default Hero;
