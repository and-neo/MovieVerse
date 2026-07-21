import Review from "../models/Review.js";
import AppError from "../utils/AppError.js";

const VALID_CONTENT_TYPES = ["movie", "tv"];

/**
 * Validates the media identification fields.
 *
 * @param {String} contentType
 * @param {Number|String} tmdbId
 */

const validateMedia = (contentType, tmdbId) => {
    if (!VALID_CONTENT_TYPES.includes(contentType)) {
        throw new AppError("Invalid content type.", 400);
    }

    const numericTmdbId = Number(tmdbId);

    if (!Number.isInteger(numericTmdbId) || numericTmdbId <= 0) {
        throw new AppError("A valid TMDb ID is required.", 400);
    }

    return numericTmdbId;
};

/**
 * Finds a review by its MongoDB ID.
 *
 * @param {String} reviewId
 * @returns {Promise<Object>}
 */

const findReviewById = async (reviewId) => {
    const review = await Review.findById(reviewId);

    if (!review) {
        throw new AppError("Review not found.", 404);
    }

    return review;
};

/**
 * Checks whether the authenticated user owns the review.
 *
 * @param {Object} review
 * @param {Object} user
 */

const validateReviewOwnership = (review, user) => {
    if (review.user.toString() !== user._id.toString()) {
        throw new AppError(
            "You are not authorized to modify this review.",
            403,
        );
    }
};

/**
 * Creates a review for a movie or TV show.
 *
 * @param {Object} user
 * @param {Object} reviewData
 * @returns {Promise<Object>}
 */

const createReview = async (user, reviewData) => {
    const { contentType, tmdbId, rating, reviewText } = reviewData;

    const numericTmdbId = validateMedia(contentType, tmdbId);

    const review = await Review.create({
        user: user._id,
        contentType,
        tmdbId: numericTmdbId,
        rating,
        reviewText,
    });

    await review.populate("user", "username avatarUrl");

    return review;
};

/**
 * Returns all reviews for a movie or TV show.
 *
 * @param {String} contentType
 * @param {Number|String} tmdbId
 * @returns {Promise<Array>}
 */

const getReviews = async (contentType, tmdbId) => {
    const numericTmdbId = validateMedia(contentType, tmdbId);

    const reviews = await Review.find({
        contentType,
        tmdbId: numericTmdbId,
    })
        .populate("user", "username avatarUrl")
        .sort({ createdAt: -1 });

    return reviews;
};

/**
 * Updates an authenticated user's review.
 *
 * @param {Object} user
 * @param {String} reviewId
 * @param {Object} updateData
 * @returns {Promise<Object>}
 */

const updateReview = async (user, reviewId, updateData) => {
    const review = await findReviewById(reviewId);

    validateReviewOwnership(review, user);

    const { rating, reviewText } = updateData;

    if (rating === undefined && reviewText === undefined) {
        throw new AppError("Rating or review text is required.", 400);
    }

    if (rating !== undefined) {
        review.rating = rating;
    }

    if (reviewText !== undefined) {
        review.reviewText = reviewText;
    }

    await review.save();

    await review.populate("user", "username avatarUrl");

    return review;
};

/**
 * Deletes an authenticated user's review.
 *
 * @param {Object} user
 * @param {String} reviewId
 * @returns {Promise<Object>}
 */

const deleteReview = async (user, reviewId) => {
    const review = await findReviewById(reviewId);

    validateReviewOwnership(review, user);

    await review.deleteOne();

    return review;
};

export { createReview, getReviews, updateReview, deleteReview };
