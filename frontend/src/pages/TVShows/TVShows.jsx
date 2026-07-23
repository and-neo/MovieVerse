import { useEffect, useState } from "react";

import "./TVShows.css";
import "../../styles/utilities.css";

import PageHeader from "../../components/common/pageHeader/PageHeader";
import MediaGrid from "../../components/media/mediaGrid/MediaGrid";
import Pagination from "../../components/pagination/Pagination";

import { getPopularTvShows } from "../../services/tvService";
import normalizeMediaItem from "../../utils/normalizeMediaItem";

const MAX_PAGES = 500;

/**
 * Displays the TV Shows page.
 */
function TVShows() {
    const [tvShows, setTvShows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let isMounted = true;

        const fetchTvShows = async () => {
            try {
                setIsLoading(true);
                setErrorMessage("");

                const tvData = await getPopularTvShows(currentPage);

                if (!isMounted) {
                    return;
                }

                const normalizedTvShows = tvData.results.map((tvShow) =>
                    normalizeMediaItem(tvShow, "tv"),
                );

                setTvShows(normalizedTvShows);

                setTotalPages(Math.min(tvData.total_pages || 1, MAX_PAGES));
            } catch (error) {
                if (!isMounted) {
                    return;
                }

                setErrorMessage(error.message || "Unable to load TV shows.");
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchTvShows();

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
                title="TV Shows"
                description="Discover popular television series from around the world."
            />

            <section className="section">
                <div className="container">
                    {isLoading && (
                        <div className="tvshows-status">
                            <p>Loading TV shows...</p>
                        </div>
                    )}

                    {!isLoading && errorMessage && (
                        <div className="tvshows-status tvshows-error">
                            <p>{errorMessage}</p>
                        </div>
                    )}

                    {!isLoading && !errorMessage && (
                        <>
                            <MediaGrid items={tvShows} />

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

export default TVShows;
