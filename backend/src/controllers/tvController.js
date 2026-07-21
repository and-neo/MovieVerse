import {
    getPopularTvShows,
    getTrendingTvShows,
    getTvShowDetails,
} from "../services/tmdbService.js";

import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import parsePage from "../utils/parsePage.js";

/**
 * Returns weekly trending TV shows.
 */

export const getTrendingTvShowsController = catchAsync(async (req, res) => {
    const page = parsePage(req.query.page);

    const tvShows = await getTrendingTvShows(page);

    res.status(200).json({
        status: "success",
        data: tvShows,
    });
});

/**
 * Returns popular TV shows.
 */

export const getPopularTvShowsController = catchAsync(async (req, res) => {
    const page = parsePage(req.query.page);

    const tvShows = await getPopularTvShows(page);

    res.status(200).json({
        status: "success",
        data: tvShows,
    });
});

/**
 * Returns detailed information for a TV show.
 */

export const getTvShowDetailsController = catchAsync(async (req, res) => {
    const { tvId } = req.params;

    if (!/^\d+$/.test(tvId)) {
        throw new AppError("TV show ID must be a positive integer.", 400);
    }

    const tvShow = await getTvShowDetails(tvId);

    res.status(200).json({
        status: "success",
        data: {
            tvShow,
        },
    });
});
