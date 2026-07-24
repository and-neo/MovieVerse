import useLibraryCollection from "../hooks/useLibraryCollection";

import {
    addFavorite,
    getFavorites,
    removeFavorite,
    addToWatchlist,
    getWatchlist,
    removeFromWatchlist,
} from "../services/libraryService";

import LibraryContext from "./LibraryContext";

/**
 * Provides shared favorites and watchlist state across the application.
 */

function LibraryProvider({ children }) {
    const favoritesCollection = useLibraryCollection(
        getFavorites,
        addFavorite,
        removeFavorite,
    );

    const watchlistCollection = useLibraryCollection(
        getWatchlist,
        addToWatchlist,
        removeFromWatchlist,
    );

    const value = {
        favorites: favoritesCollection.items,
        favoritesLoading: favoritesCollection.isLoading,
        favoritesError: favoritesCollection.error,
        refreshFavorites: favoritesCollection.fetchItems,
        isFavorite: favoritesCollection.hasItem,
        addFavorite: favoritesCollection.add,
        removeFavorite: favoritesCollection.remove,
        toggleFavorite: favoritesCollection.toggle,
        isFavoritePending: favoritesCollection.isItemPending,

        watchlist: watchlistCollection.items,
        watchlistLoading: watchlistCollection.isLoading,
        watchlistError: watchlistCollection.error,
        refreshWatchlist: watchlistCollection.fetchItems,
        isInWatchlist: watchlistCollection.hasItem,
        addToWatchlist: watchlistCollection.add,
        removeFromWatchlist: watchlistCollection.remove,
        toggleWatchlist: watchlistCollection.toggle,
        isWatchlistPending: watchlistCollection.isItemPending,
    };

    return (
        <LibraryContext.Provider value={value}>
            {children}
        </LibraryContext.Provider>
    );
}

export default LibraryProvider;
