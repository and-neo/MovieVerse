import catchAsync from "../utils/catchAsync.js";

import {
    createReview as createReviewService,
    getReviews as getReviewsService,
    updateReview as updateReviewService,
    deleteReview as deleteReviewService,
} from "../services/reviewService.js";

/**
 * Creates a review for the authenticated user.
 */
const createReview = catchAsync(async (req, res) => {
    const review = await createReviewService(req.user, req.body);

    res.status(201).json({
        status: "success",
        message: "Review created successfully.",
        data: {
            review,
        },
    });
});

/**
 * Returns all reviews for a movie or TV show.
 */
const getReviews = catchAsync(async (req, res) => {
    const { contentType, tmdbId } = req.params;

    const reviews = await getReviewsService(contentType, tmdbId);

    res.status(200).json({
        status: "success",
        results: reviews.length,
        data: {
            reviews,
        },
    });
});

/**
 * Updates an authenticated user's review.
 */
const updateReview = catchAsync(async (req, res) => {
    const { reviewId } = req.params;

    const review = await updateReviewService(req.user, reviewId, req.body);

    res.status(200).json({
        status: "success",
        message: "Review updated successfully.",
        data: {
            review,
        },
    });
});

/**
 * Deletes an authenticated user's review.
 */
const deleteReview = catchAsync(async (req, res) => {
    const { reviewId } = req.params;

    await deleteReviewService(req.user, reviewId);

    res.status(200).json({
        status: "success",
        message: "Review deleted successfully.",
        data: null,
    });
});

export { createReview, getReviews, updateReview, deleteReview };
