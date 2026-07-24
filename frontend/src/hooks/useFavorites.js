import useLibrary from "./useLibrary";

/**
 * Returns the shared favorites collection.
 *
 * @returns {Object}
 */
function useFavorites() {
    const {
        favorites,
        favoritesLoading,
        favoritesError,
        refreshFavorites,
        isFavorite,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavoritePending,
    } = useLibrary();

    return {
        favorites,
        isLoading: favoritesLoading,
        error: favoritesError,
        refreshFavorites,
        isFavorite,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavoritePending,
    };
}

export default useFavorites;
