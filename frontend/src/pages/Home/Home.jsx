import "./Home.css";
import "../../styles/utilities.css";

import Hero from "../../components/hero/Hero";
import SearchBar from "../../components/searchBar/SearchBar";
import MovieCard from "../../components/movie/movieCard/MovieCard";

import dummyMovies from "../../data/dummyMovies";

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

                    <div className="movies-grid">
                        {dummyMovies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default HomePage;
