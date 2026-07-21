import {
    getMovieDetails,
    getPopularMovies,
    getTrendingMovies,
} from "../services/tmdbService.js";

import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import parsePage from "../utils/parsePage.js";

/**
 * Returns weekly trending movies.
 */

export const getTrendingMoviesController = catchAsync(async (req, res) => {
    const page = parsePage(req.query.page);

    const movies = await getTrendingMovies(page);

    res.status(200).json({
        status: "success",
        data: movies,
    });
});

/**
 * Returns popular movies.
 */

export const getPopularMoviesController = catchAsync(async (req, res) => {
    const page = parsePage(req.query.page);

    const movies = await getPopularMovies(page);

    res.status(200).json({
        status: "success",
        data: movies,
    });
});

/**
 * Returns detailed information for a movie.
 */

export const getMovieDetailsController = catchAsync(async (req, res) => {
    const { movieId } = req.params;

    if (!/^\d+$/.test(movieId)) {
        throw new AppError("Movie ID must be a positive integer.", 400);
    }

    const movie = await getMovieDetails(movieId);

    res.status(200).json({
        status: "success",
        data: {
            movie,
        },
    });
});
