import api from "./api.js";

/**
 * Fetches MovieVerse reviews for a movie or TV show.
 *
 * @param {"movie"|"tv"} contentType - Media type.
 * @param {number|string} tmdbId - TMDb media ID.
 * @returns {Promise<Array>} MovieVerse reviews.
 */

export const getReviews = async (contentType, tmdbId) => {
    const response = await api.get(`/reviews/${contentType}/${tmdbId}`);

    return response.data.data.reviews;
};

/**
 * Creates a MovieVerse review.
 *
 * @param {object} reviewData - Review fields.
 * @returns {Promise<object>} Created review.
 */
export const createReview = async (reviewData) => {
    const response = await api.post("/reviews", reviewData);

    return response.data.data.review;
};

/**
 * Updates an existing MovieVerse review.
 *
 * @param {string} reviewId - MongoDB review ID.
 * @param {object} reviewData - Updated review fields.
 * @returns {Promise<object>} Updated review.
 */
export const updateReview = async (reviewId, reviewData) => {
    const response = await api.patch(`/reviews/${reviewId}`, reviewData);

    return response.data.data.review;
};

/**
 * Deletes an existing MovieVerse review.
 *
 * @param {string} reviewId - MongoDB review ID.
 * @returns {Promise<void>}
 */
export const deleteReview = async (reviewId) => {
    await api.delete(`/reviews/${reviewId}`);
};
