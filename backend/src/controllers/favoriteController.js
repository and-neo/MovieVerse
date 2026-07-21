import catchAsync from "../utils/catchAsync.js";

import { addItem, getItems, removeItem } from "../services/libraryService.js";

/**
 * Adds a media item to the authenticated user's favorites.
 */

const addFavorite = catchAsync(async (req, res) => {
    const favorites = await addItem(
        req.user,
        "favorites",
        req.body,
        "favorites",
    );

    res.status(201).json({
        status: "success",
        message: "Added to favorites.",
        data: {
            favorites,
        },
    });
});

/**
 * Returns the authenticated user's favorites.
 */

const getFavorites = catchAsync(async (req, res) => {
    const favorites = getItems(req.user, "favorites");

    res.status(200).json({
        status: "success",
        results: favorites.length,
        data: {
            favorites,
        },
    });
});

/**
 * Removes a media item from the authenticated user's favorites.
 */

const removeFavorite = catchAsync(async (req, res) => {
    const { contentType, tmdbId } = req.params;

    const favorites = await removeItem(
        req.user,
        "favorites",
        contentType,
        tmdbId,
        "Favorite",
    );

    res.status(200).json({
        status: "success",
        message: "Removed from favorites.",
        data: {
            favorites,
        },
    });
});

export { addFavorite, getFavorites, removeFavorite };
