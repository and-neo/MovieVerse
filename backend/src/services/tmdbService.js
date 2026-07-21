import axios from "axios";

import AppError from "../utils/AppError.js";

const { TMDB_API_KEY, TMDB_BASE_URL } = process.env;

if (!TMDB_API_KEY || !TMDB_BASE_URL) {
    throw new Error(
        "TMDb configuration is missing. Check TMDB_API_KEY and TMDB_BASE_URL.",
    );
}

const TMDB_ENDPOINTS = {
    movies: {
        trending: "/trending/movie/week",
        popular: "/movie/popular",
        details: (movieId) => `/movie/${movieId}`,
    },

    tv: {
        trending: "/trending/tv/week",
        popular: "/tv/popular",
        details: (tvId) => `/tv/${tvId}`,
    },

    search: "/search/multi",
};

const tmdbApi = axios.create({
    baseURL: TMDB_BASE_URL,
    timeout: 10000,
    params: {
        api_key: TMDB_API_KEY,
    },
});

/**
 * Converts Axios and TMDb errors into application errors.
 *
 * @param {unknown} error - The received request error.
 * @returns {AppError} A standardized application error.
 */

const mapTmdbError = (error) => {
    if (!axios.isAxiosError(error)) {
        return new AppError(
            "An unexpected error occurred while communicating with TMDb.",
            500,
        );
    }

    if (error.code === "ECONNABORTED") {
        return new AppError(
            "TMDb request timed out. Please try again later.",
            504,
        );
    }

    if (!error.response) {
        return new AppError(
            "Unable to connect to TMDb. Please try again later.",
            503,
        );
    }

    const status = error.response.status;

    switch (status) {
        case 400:
            return new AppError("TMDb rejected the request.", 400);

        case 401:
        case 403:
            return new AppError("TMDb authentication failed.", 502);

        case 404:
            return new AppError("The requested media could not be found.", 404);

        case 429:
            return new AppError(
                "TMDb request limit reached. Please try again later.",
                429,
            );

        default:
            return new AppError("TMDb service is currently unavailable.", 502);
    }
};

/**
 * Sends a GET request to the TMDb API.
 *
 * @param {string} endpoint - The TMDb endpoint.
 * @param {object} params - Optional query parameters.
 * @returns {Promise<object>} The TMDb response data.
 */

const fetchFromTmdb = async (endpoint, params = {}) => {
    try {
        const response = await tmdbApi.get(endpoint, {
            params,
        });

        return response.data;
    } catch (error) {
        throw mapTmdbError(error);
    }
};

/**
 * Retrieves the weekly trending movies.
 *
 * @param {number} page - Results page.
 * @returns {Promise<object>} Trending movie data.
 */

export const getTrendingMovies = (page = 1) =>
    fetchFromTmdb(TMDB_ENDPOINTS.movies.trending, {
        page,
        language: "en-US",
    });

/**
 * Retrieves popular movies.
 *
 * @param {number} page - Results page.
 * @returns {Promise<object>} Popular movie data.
 */

export const getPopularMovies = (page = 1) =>
    fetchFromTmdb(TMDB_ENDPOINTS.movies.popular, {
        page,
        language: "en-US",
    });

/**
 * Retrieves detailed information for a movie.
 *
 * @param {string|number} movieId - The TMDb movie ID.
 * @returns {Promise<object>} Movie details.
 */

export const getMovieDetails = (movieId) =>
    fetchFromTmdb(TMDB_ENDPOINTS.movies.details(movieId), {
        language: "en-US",
        append_to_response: "credits,similar,videos",
    });

/**
 * Retrieves the weekly trending TV shows.
 *
 * @param {number} page - Results page.
 * @returns {Promise<object>} Trending TV data.
 */

export const getTrendingTvShows = (page = 1) =>
    fetchFromTmdb(TMDB_ENDPOINTS.tv.trending, {
        page,
        language: "en-US",
    });

/**
 * Retrieves popular TV shows.
 *
 * @param {number} page - Results page.
 * @returns {Promise<object>} Popular TV data.
 */

export const getPopularTvShows = (page = 1) =>
    fetchFromTmdb(TMDB_ENDPOINTS.tv.popular, {
        page,
        language: "en-US",
    });

/**
 * Retrieves detailed information for a TV show.
 *
 * @param {string|number} tvId - The TMDb TV show ID.
 * @returns {Promise<object>} TV show details.
 */

export const getTvShowDetails = (tvId) =>
    fetchFromTmdb(TMDB_ENDPOINTS.tv.details(tvId), {
        language: "en-US",
        append_to_response: "credits,similar,videos",
    });

/**
 * Searches for movies and TV shows.
 *
 * @param {string} query - Search keywords.
 * @param {number} page - Results page.
 * @returns {Promise<object>} Filtered search results.
 */

export const searchMedia = async (query, page = 1) => {
    const data = await fetchFromTmdb(TMDB_ENDPOINTS.search, {
        query,
        page,
        language: "en-US",
        include_adult: false,
    });

    return {
        ...data,
        results: data.results.filter(
            (item) => item.media_type === "movie" || item.media_type === "tv",
        ),
    };
};
