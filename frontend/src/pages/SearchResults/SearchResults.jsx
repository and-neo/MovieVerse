import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import "./SearchResults.css";

import PageHeader from "../../components/common/pageHeader/PageHeader";
import MediaGrid from "../../components/media/mediaGrid/MediaGrid";

import { searchMedia } from "../../services/searchService";

/**
 * Displays movie and TV show search results.
 */

function SearchResults() {
    const [searchParams] = useSearchParams();

    const query = searchParams.get("q")?.trim() || "";

    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let isMounted = true;

        const fetchSearchResults = async () => {
            if (!query) {
                setResults([]);
                setIsLoading(false);
                setErrorMessage("");
                return;
            }

            try {
                setIsLoading(true);
                setErrorMessage("");

                const searchResults = await searchMedia(query);

                if (!isMounted) {
                    return;
                }

                setResults(searchResults);
            } catch (error) {
                if (!isMounted) {
                    return;
                }

                setResults([]);
                setErrorMessage(
                    error.message || "Unable to load search results.",
                );
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchSearchResults();

        return () => {
            isMounted = false;
        };
    }, [query]);

    let pageDescription = "Search for movies and TV shows.";

    if (query && isLoading) {
        pageDescription = "Searching for matching movies and TV shows.";
    } else if (query && !errorMessage) {
        pageDescription = `${results.length} matching ${
            results.length === 1 ? "result" : "results"
        } found.`;
    } else if (query && errorMessage) {
        pageDescription = "The search results could not be loaded.";
    }

    function renderContent() {
        if (!query) {
            return (
                <p className="search-status">
                    Enter a movie or TV show title to begin searching.
                </p>
            );
        }

        if (isLoading) {
            return <p className="search-status">Searching for “{query}”...</p>;
        }

        if (errorMessage) {
            return (
                <p className="search-status search-error" role="alert">
                    {errorMessage}
                </p>
            );
        }

        if (results.length === 0) {
            return (
                <p className="search-status">No results found for “{query}”.</p>
            );
        }

        return <MediaGrid items={results} />;
    }

    return (
        <main>
            <PageHeader
                title={
                    query ? `Search Results for “${query}”` : "Search Results"
                }
                description={pageDescription}
            />

            <section className="section">
                <div className="container">{renderContent()}</div>
            </section>
        </main>
    );
}

export default SearchResults;
