import api from "./api.js";

/**
 * Fetches weekly trending movies.
 *
 * @param {number} page - Results page.
 * @returns {Promise<object>} Trending movie data.
 */

export const getTrendingMovies = async (page = 1) => {
    const response = await api.get("/movies/trending", {
        params: {
            page,
        },
    });

    return response.data.data;
};

/**
 * Fetches popular movies.
 *
 * @param {number} page - Results page.
 * @returns {Promise<object>} Popular movie data.
 */

export const getPopularMovies = async (page = 1) => {
    const response = await api.get("/movies/popular", {
        params: {
            page,
        },
    });

    return response.data.data;
};

/**
 * Fetches the details of a movie.
 *
 * @param {number|string} movieId - TMDb movie ID.
 * @returns {Promise<object>} Movie details.
 */

export const getMovieDetails = async (movieId) => {
    const response = await api.get(`/movies/${movieId}`);

    return response.data.data.movie;
};
