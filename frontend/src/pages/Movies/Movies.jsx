import { useEffect, useState } from "react";

import "./Movies.css";
import "../../styles/utilities.css";

import PageHeader from "../../components/common/pageHeader/PageHeader";
import MediaGrid from "../../components/media/mediaGrid/MediaGrid";
import Pagination from "../../components/pagination/Pagination";

import { getPopularMovies } from "../../services/movieService";
import normalizeMediaItem from "../../utils/normalizeMediaItem";

const MAX_PAGES = 500;

/**
 * Displays the Movies page.
 */

function Movies() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let isMounted = true;

        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                setErrorMessage("");

                const movieData = await getPopularMovies(currentPage);

                if (!isMounted) {
                    return;
                }

                const normalizedMovies = movieData.results.map((movie) =>
                    normalizeMediaItem(movie, "movie"),
                );

                setMovies(normalizedMovies);
                setTotalPages(Math.min(movieData.total_pages || 1, MAX_PAGES));
            } catch (error) {
                if (!isMounted) {
                    return;
                }

                setErrorMessage(
                    error.message || "Unable to load popular movies.",
                );
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchMovies();

        return () => {
            isMounted = false;
        };
    }, [currentPage]);

    const handlePreviousPage = () => {
        setCurrentPage((previousPage) => Math.max(previousPage - 1, 1));

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleNextPage = () => {
        setCurrentPage((previousPage) =>
            Math.min(previousPage + 1, totalPages),
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <main>
            <PageHeader
                title="Movies"
                description="Browse the most popular movies and discover your next favorite film."
            />

            <section className="section">
                <div className="container">
                    {isLoading && (
                        <div className="movies-status">
                            <p>Loading popular movies...</p>
                        </div>
                    )}

                    {!isLoading && errorMessage && (
                        <div className="movies-status movies-error">
                            <p>{errorMessage}</p>
                        </div>
                    )}

                    {!isLoading && !errorMessage && (
                        <>
                            <MediaGrid items={movies} />

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPrevious={handlePreviousPage}
                                onNext={handleNextPage}
                            />
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}

export default Movies;
