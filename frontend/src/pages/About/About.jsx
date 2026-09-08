import "./About.css";
import "../../styles/utilities.css";

/**
 * About page of the application.
 *
 * Provides information about MovieVerse and TMDb attribution.
 */

function About() {
    return (
        <main className="about-page">
            <section className="section">
                <div className="container about-container">
                    <div className="about-content">
                        <h1 className="about-title">About MovieVerse</h1>

                        <p>
                            MovieVerse is a web application designed for
                            discovering, exploring, and organizing movies and TV
                            shows.
                        </p>

                        <p>
                            Browse popular and trending titles, search for
                            movies and TV shows, explore detailed information,
                            cast and similar content, and discover what to watch
                            next.
                        </p>

                        <p>
                            By creating an account, you can build your own
                            personal library with Favorites and Watchlist,
                            manage your profile, and share your opinion by
                            writing reviews that include a rating and written
                            comment.
                        </p>
                    </div>

                    <div className="about-tmdb">
                        <h2>Powered by TMDb</h2>

                        <img
                            src="/tmdb-logo.svg"
                            alt="The Movie Database (TMDb)"
                            className="about-tmdb-logo"
                        />

                        <p>
                            Movie and TV show information, images, and related
                            media displayed on MovieVerse are provided through
                            The Movie Database (TMDb) API.
                        </p>

                        <p className="about-tmdb-disclaimer">
                            This product uses the TMDB API but is not endorsed
                            or certified by TMDB.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default About;
