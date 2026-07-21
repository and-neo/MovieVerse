import AppError from "./AppError.js";

/**
 * Parses and validates a pagination query parameter.
 *
 * @param {string|undefined} pageValue - The page query parameter.
 * @returns {number} A valid positive integer.
 */
const parsePage = (pageValue) => {
    const page = pageValue === undefined ? 1 : Number(pageValue);

    if (!Number.isInteger(page) || page < 1) {
        throw new AppError("Page must be a positive integer.", 400);
    }

    return page;
};

export default parsePage;
