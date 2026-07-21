import AppError from "../utils/AppError.js";

/**
 * Adds a media item to a user's library collection.
 *
 * @param {Object} user
 * @param {String} field
 * @param {Object} item
 * @param {String} collectionName
 * @returns {Promise<Array>}
 */
const addItem = async (user, field, item, collectionName) => {
    const { contentType, tmdbId, title, posterPath } = item;

    if (!contentType || !tmdbId || !title || !posterPath) {
        throw new AppError(
            "Content type, TMDb ID, title and poster path are required.",
            400,
        );
    }

    if (!["movie", "tv"].includes(contentType)) {
        throw new AppError("Invalid content type.", 400);
    }

    const alreadyExists = user[field].some(
        (libraryItem) =>
            libraryItem.contentType === contentType &&
            libraryItem.tmdbId === tmdbId,
    );

    if (alreadyExists) {
        throw new AppError(
            `This item is already in your ${collectionName}.`,
            409,
        );
    }

    user[field].push({
        contentType,
        tmdbId,
        title,
        posterPath,
    });

    await user.save();

    return user[field];
};

/**
 * Returns a user's library collection.
 *
 * @param {Object} user
 * @param {String} field
 * @returns {Array}
 */
const getItems = (user, field) => {
    return user[field];
};

/**
 * Removes a media item from a user's library collection.
 *
 * @param {Object} user
 * @param {String} field
 * @param {String} contentType
 * @param {Number|String} tmdbId
 * @param {String} resourceName
 * @returns {Promise<Array>}
 */
const removeItem = async (user, field, contentType, tmdbId, resourceName) => {
    if (!["movie", "tv"].includes(contentType)) {
        throw new AppError("Invalid content type.", 400);
    }

    const itemIndex = user[field].findIndex(
        (libraryItem) =>
            libraryItem.contentType === contentType &&
            libraryItem.tmdbId === Number(tmdbId),
    );

    if (itemIndex === -1) {
        throw new AppError(`${resourceName} not found.`, 404);
    }

    user[field].splice(itemIndex, 1);

    await user.save();

    return user[field];
};

export { addItem, getItems, removeItem };
