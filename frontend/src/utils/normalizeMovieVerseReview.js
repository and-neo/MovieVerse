/**
 * Converts a MovieVerse review into the format expected
 * by the frontend review components.
 *
 * @param {object} review - Raw MovieVerse review.
 * @param {string|null} currentUserId - Authenticated user ID.
 * @returns {object} Normalized MovieVerse review.
 */

function normalizeMovieVerseReview(review, currentUserId = null) {
    return {
        id: review._id,
        source: "movieverse",
        displaySource: "MovieVerse",
        author: review.user?.username || "MovieVerse User",
        avatar: review.user?.avatarUrl || null,
        rating: review.rating ?? null,
        reviewText: review.reviewText || "",
        createdAt: review.createdAt || null,
        updatedAt: review.updatedAt || null,
        isOwner: Boolean(currentUserId) && review.user?._id === currentUserId,
    };
}

export default normalizeMovieVerseReview;
