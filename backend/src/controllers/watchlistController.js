import catchAsync from "../utils/catchAsync.js";

import { addItem, getItems, removeItem } from "../services/libraryService.js";

/**
 * Adds a media item to the authenticated user's watchlist.
 */
const addToWatchlist = catchAsync(async (req, res) => {
    const watchlist = await addItem(
        req.user,
        "watchlist",
        req.body,
        "watchlist",
    );

    res.status(201).json({
        status: "success",
        message: "Added to watchlist.",
        data: {
            watchlist,
        },
    });
});

/**
 * Returns the authenticated user's watchlist.
 */
const getWatchlist = catchAsync(async (req, res) => {
    const watchlist = getItems(req.user, "watchlist");

    res.status(200).json({
        status: "success",
        results: watchlist.length,
        data: {
            watchlist,
        },
    });
});

/**
 * Removes a media item from the authenticated user's watchlist.
 */
const removeFromWatchlist = catchAsync(async (req, res) => {
    const { contentType, tmdbId } = req.params;

    const watchlist = await removeItem(
        req.user,
        "watchlist",
        contentType,
        tmdbId,
        "Watchlist item",
    );

    res.status(200).json({
        status: "success",
        message: "Removed from watchlist.",
        data: {
            watchlist,
        },
    });
});

export { addToWatchlist, getWatchlist, removeFromWatchlist };
