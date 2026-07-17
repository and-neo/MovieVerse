import "./MovieDetails.css";

import { useParams } from "react-router-dom";
import { useEffect } from "react";

import MediaHero from "../../components/media/mediaHero/MediaHero";
import MediaOverview from "../../components/media/mediaOverview/MediaOverview";
import CastList from "../../components/cast/castList/CastList";
import ReviewList from "../../components/review/reviewList/ReviewList";
import SimilarMedia from "../../components/media/similarMedia/SimilarMedia";

import movies from "../../data/movies";

/**
 * Displays the details of a selected movie.
 * Currently uses mock data.
 */

function MovieDetails() {
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const movie = movies.find((item) => item.id === Number(id));

    if (!movie) {
        return (
            <main className="section">
                <div className="container">
                    <h1>Movie not found</h1>
                </div>
            </main>
        );
    }

    const similarMovies = movies
        .filter((item) => item.id !== movie.id)
        .slice(0, 4);

    return (
        <main>
            <MediaHero item={movie} />

            <MediaOverview overview={movie.overview} />

            <CastList cast={movie.cast} />

            <ReviewList reviews={movie.reviews} />

            <SimilarMedia items={similarMovies} />
        </main>
    );
}

export default MovieDetails;
