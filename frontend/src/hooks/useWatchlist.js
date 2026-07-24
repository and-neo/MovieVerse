import useLibrary from "./useLibrary";

/**
 * Returns the shared watchlist collection.
 *
 * @returns {Object}
 */
function useWatchlist() {
    const {
        watchlist,
        watchlistLoading,
        watchlistError,
        refreshWatchlist,
        isInWatchlist,
        addToWatchlist,
        removeFromWatchlist,
        toggleWatchlist,
        isWatchlistPending,
    } = useLibrary();

    return {
        watchlist,
        isLoading: watchlistLoading,
        error: watchlistError,
        refreshWatchlist,
        isInWatchlist,
        addToWatchlist,
        removeFromWatchlist,
        toggleWatchlist,
        isWatchlistPending,
    };
}

export default useWatchlist;
