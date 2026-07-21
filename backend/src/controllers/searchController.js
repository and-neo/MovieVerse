import { searchMedia } from "../services/tmdbService.js";

import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import parsePage from "../utils/parsePage.js";

/**
 * Searches for movies and TV shows.
 */

export const searchMediaController = catchAsync(async (req, res) => {
    const query = req.query.query?.trim();
    const page = parsePage(req.query.page);

    if (!query) {
        throw new AppError("Search query is required.", 400);
    }

    const results = await searchMedia(query, page);

    res.status(200).json({
        status: "success",
        data: results,
    });
});
