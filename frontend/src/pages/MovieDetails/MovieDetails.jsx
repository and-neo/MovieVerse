import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./MovieDetails.css";
import "../../styles/utilities.css";

import MediaHero from "../../components/media/mediaHero/mediaHero.jsx";
import MediaOverview from "../../components/media/mediaOverview/MediaOverview.jsx";
import CastList from "../../components/cast/castList/CastList.jsx";
import ReviewSection from "../../components/review/reviewSection/reviewSection.jsx";
import SimilarMedia from "../../components/media/similarMedia/SimilarMedia.jsx";

import { getMovieDetails } from "../../services/movieService";
import normalizeMovieDetails from "../../utils/normalizeMovieDetails";

/**
 * Displays the details of a selected movie.
 */

function MovieDetails() {
    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let isMounted = true;

        window.scrollTo(0, 0);

        const fetchMovieDetails = async () => {
            try {
                setIsLoading(true);
                setErrorMessage("");

                const movieData = await getMovieDetails(id);

                if (!isMounted) {
                    return;
                }

                setMovie(normalizeMovieDetails(movieData));
            } catch (error) {
                if (!isMounted) {
                    return;
                }

                setMovie(null);
                setErrorMessage(
                    error.message || "Unable to load movie details.",
                );
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchMovieDetails();

        return () => {
            isMounted = false;
        };
    }, [id]);

    if (isLoading) {
        return (
            <main className="section">
                <div className="container movie-details-status">
                    <p>Loading movie details...</p>
                </div>
            </main>
        );
    }

    if (errorMessage || !movie) {
        return (
            <main className="section">
                <div className="container movie-details-status movie-details-error">
                    <h1>Movie unavailable</h1>

                    <p>
                        {errorMessage ||
                            "The requested movie could not be found."}
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main>
            <MediaHero item={movie} contentType="movie" />

            <MediaOverview overview={movie.overview} />

            <CastList cast={movie.cast} />

            <ReviewSection
                contentType="movie"
                tmdbId={movie.id}
                tmdbReviews={movie.reviews}
            />

            <SimilarMedia items={movie.similar} />
        </main>
    );
}

export default MovieDetails;
