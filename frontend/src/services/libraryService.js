import api from "./api";

/**
 * Retrieves the authenticated user's favorites.
 *
 * @returns {Promise<Array>}
 */

async function getFavorites() {
    const response = await api.get("/favorites");

    return response.data.data.favorites;
}

/**
 * Adds a media item to the authenticated user's favorites.
 *
 * @param {Object} item
 * @returns {Promise<Array>}
 */

async function addFavorite(item) {
    const response = await api.post("/favorites", item);

    return response.data.data.favorites;
}

/**
 * Removes a media item from the authenticated user's favorites.
 *
 * @param {String} contentType
 * @param {Number} tmdbId
 * @returns {Promise<Array>}
 */

async function removeFavorite(contentType, tmdbId) {
    const response = await api.delete(`/favorites/${contentType}/${tmdbId}`);

    return response.data.data.favorites;
}

/**
 * Retrieves the authenticated user's watchlist.
 *
 * @returns {Promise<Array>}
 */

async function getWatchlist() {
    const response = await api.get("/watchlist");

    return response.data.data.watchlist;
}

/**
 * Adds a media item to the authenticated user's watchlist.
 *
 * @param {Object} item
 * @returns {Promise<Array>}
 */

async function addToWatchlist(item) {
    const response = await api.post("/watchlist", item);

    return response.data.data.watchlist;
}

/**
 * Removes a media item from the authenticated user's watchlist.
 *
 * @param {String} contentType
 * @param {Number} tmdbId
 * @returns {Promise<Array>}
 */

async function removeFromWatchlist(contentType, tmdbId) {
    const response = await api.delete(`/watchlist/${contentType}/${tmdbId}`);

    return response.data.data.watchlist;
}

export {
    addFavorite,
    addToWatchlist,
    getFavorites,
    getWatchlist,
    removeFavorite,
    removeFromWatchlist,
};
