import "./Home.css";
import "../../styles/utilities.css";

import Hero from "../../components/home/hero/Hero";
import SearchBar from "../../components/common/searchBar/SearchBar";
import MediaGrid from "../../components/media/mediaGrid/MediaGrid";

import movies from "../../data/movies";

/**
 * Home page of the application.
 */

function HomePage() {
    return (
        <main>
            <Hero />

            <SearchBar />

            <section className="section home-section">
                <div className="container">
                    <h2 className="section-title">Trending This Week</h2>

                    <MediaGrid items={movies} />
                </div>
            </section>
        </main>
    );
}

export default HomePage;
