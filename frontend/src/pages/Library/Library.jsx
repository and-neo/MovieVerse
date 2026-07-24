import LibrarySection from "../../components/library/LibrarySection/LibrarySection";
import useFavorites from "../../hooks/useFavorites";
import useWatchlist from "../../hooks/useWatchlist";

import "./Library.css";

/**
 * Displays the authenticated user's saved media collections.
 */
function Library() {
    const { favorites, favoritesLoading, favoritesError } = useFavorites();

    const { watchlist, watchlistLoading, watchlistError } = useWatchlist();

    const isLoading = favoritesLoading || watchlistLoading;
    const error = favoritesError || watchlistError;

    if (isLoading) {
        return (
            <main className="library-page">
                <div className="library-page-container">
                    <p className="library-page-status">
                        Loading your library...
                    </p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="library-page">
                <div className="library-page-container">
                    <p className="library-page-error">
                        {typeof error === "string"
                            ? error
                            : "Unable to load your library."}
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="library-page">
            <div className="library-page-container">
                <header className="library-page-header">
                    <h1 className="library-page-title">My Library</h1>

                    <p className="library-page-description">
                        Your favorite movies and TV shows, together with
                        everything you plan to watch.
                    </p>
                </header>

                <LibrarySection
                    title="Favorites"
                    items={favorites}
                    emptyMessage="You have not added any favorites yet."
                />

                <LibrarySection
                    title="Watchlist"
                    items={watchlist}
                    emptyMessage="Your watchlist is currently empty."
                />
            </div>
        </main>
    );
}

export default Library;
