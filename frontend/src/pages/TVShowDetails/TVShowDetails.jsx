import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./TVShowDetails.css";
import "../../styles/utilities.css";

import MediaHero from "../../components/media/mediaHero/MediaHero";
import MediaOverview from "../../components/media/mediaOverview/MediaOverview";
import CastList from "../../components/cast/castList/CastList";
import ReviewList from "../../components/review/reviewList/ReviewList";
import SimilarMedia from "../../components/media/similarMedia/SimilarMedia";

import { getTvShowDetails } from "../../services/tvService";
import normalizeTvShowDetails from "../../utils/normalizeTvShowDetails";

/**
 * Displays the details of a selected TV show.
 */
function TVShowDetails() {
    const { id } = useParams();

    const [tvShow, setTvShow] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let isMounted = true;

        window.scrollTo(0, 0);

        const fetchTvShow = async () => {
            try {
                setIsLoading(true);
                setErrorMessage("");

                const tvData = await getTvShowDetails(id);

                if (!isMounted) {
                    return;
                }

                setTvShow(normalizeTvShowDetails(tvData));
            } catch (error) {
                if (!isMounted) {
                    return;
                }

                setTvShow(null);

                setErrorMessage(
                    error.message || "Unable to load TV show details.",
                );
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchTvShow();

        return () => {
            isMounted = false;
        };
    }, [id]);

    if (isLoading) {
        return (
            <main className="section">
                <div className="container tvshow-details-status">
                    <p>Loading TV show details...</p>
                </div>
            </main>
        );
    }

    if (errorMessage || !tvShow) {
        return (
            <main className="section">
                <div className="container tvshow-details-status tvshow-details-error">
                    <h1>TV show unavailable</h1>

                    <p>
                        {errorMessage ||
                            "The requested TV show could not be found."}
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main>
            <MediaHero item={tvShow} />

            <MediaOverview overview={tvShow.overview} />

            <CastList cast={tvShow.cast} />

            <ReviewList reviews={tvShow.reviews} />

            <SimilarMedia items={tvShow.similar} />
        </main>
    );
}

export default TVShowDetails;
