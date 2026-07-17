import "./TVShowDetails.css";

import { useEffect } from "react";
import { useParams } from "react-router-dom";

import MediaHero from "../../components/media/mediaHero/MediaHero";
import MediaOverview from "../../components/media/mediaOverview/MediaOverview";
import CastList from "../../components/cast/castList/CastList";
import ReviewList from "../../components/review/reviewList/ReviewList";
import SimilarMedia from "../../components/media/similarMedia/SimilarMedia";

import tvShows from "../../data/tvShows";

/**
 * Displays the details of a selected TV show.
 * Currently uses mock data.
 */

function TVShowDetails() {
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const show = tvShows.find((item) => item.id === Number(id));

    if (!show) {
        return (
            <main className="section">
                <div className="container">
                    <h1>TV show not found</h1>
                </div>
            </main>
        );
    }

    const similarTVShows = tvShows
        .filter((item) => item.id !== show.id)
        .slice(0, 4);

    return (
        <main>
            <MediaHero item={show} />

            <MediaOverview overview={show.overview} />

            <CastList cast={show.cast} />

            <ReviewList reviews={show.reviews} />

            <SimilarMedia items={similarTVShows} />
        </main>
    );
}

export default TVShowDetails;
