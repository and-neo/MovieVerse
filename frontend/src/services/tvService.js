import api from "./api.js";

/**
 * Fetches weekly trending TV shows.
 *
 * @param {number} page - Results page.
 * @returns {Promise<object>} Trending TV show data.
 */

export const getTrendingTvShows = async (page = 1) => {
    const response = await api.get("/tv/trending", {
        params: {
            page,
        },
    });

    return response.data.data;
};

/**
 * Fetches popular TV shows.
 *
 * @param {number} page - Results page.
 * @returns {Promise<object>} Popular TV show data.
 */

export const getPopularTvShows = async (page = 1) => {
    const response = await api.get("/tv/popular", {
        params: {
            page,
        },
    });

    return response.data.data;
};

/**
 * Fetches the details of a TV show.
 *
 * @param {number|string} tvId - TMDb TV show ID.
 * @returns {Promise<object>} TV show details.
 */

export const getTvShowDetails = async (tvId) => {
    const response = await api.get(`/tv/${tvId}`);

    return response.data.data.tvShow;
};
