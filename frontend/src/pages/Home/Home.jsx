import { useEffect, useState } from "react";

import "./Home.css";
import "../../styles/utilities.css";

import Hero from "../../components/home/hero/hero.jsx";
import SearchBar from "../../components/common/searchBar/SearchBar.jsx";
import MediaGrid from "../../components/media/mediaGrid/MediaGrid.jsx";

import { getTrendingMovies } from "../../services/movieService.js";
import { getTrendingTvShows } from "../../services/tvService.js";
import normalizeMediaItem from "../../utils/normalizeMediaItem.js";

/**
 * Home page of the application.
 */

function HomePage() {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [trendingTvShows, setTrendingTvShows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let isMounted = true;

        const fetchTrendingMedia = async () => {
            try {
                setIsLoading(true);
                setErrorMessage("");

                const [movieData, tvData] = await Promise.all([
                    getTrendingMovies(),
                    getTrendingTvShows(),
                ]);

                if (!isMounted) {
                    return;
                }

                const normalizedMovies = movieData.results
                    .slice(0, 8)
                    .map((movie) => normalizeMediaItem(movie, "movie"));

                const normalizedTvShows = tvData.results
                    .slice(0, 8)
                    .map((tvShow) => normalizeMediaItem(tvShow, "tv"));

                setTrendingMovies(normalizedMovies);
                setTrendingTvShows(normalizedTvShows);
            } catch (error) {
                if (!isMounted) {
                    return;
                }

                setErrorMessage(
                    error.message ||
                        "Unable to load trending movies and TV shows.",
                );
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchTrendingMedia();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <main>
            <Hero />

            <SearchBar />

            {isLoading && (
                <div className="container home-status">
                    <p>Loading trending content...</p>
                </div>
            )}

            {!isLoading && errorMessage && (
                <div className="container home-status home-error">
                    <p>{errorMessage}</p>
                </div>
            )}

            {!isLoading && !errorMessage && (
                <>
                    <section className="section home-section">
                        <div className="container">
                            <h2 className="section-title">Trending Movies</h2>

                            <MediaGrid items={trendingMovies} />
                        </div>
                    </section>

                    <section className="section home-section">
                        <div className="container">
                            <h2 className="section-title">Trending TV Shows</h2>

                            <MediaGrid items={trendingTvShows} />
                        </div>
                    </section>
                </>
            )}
        </main>
    );
}

export default HomePage;
