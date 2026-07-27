const TMDB_AVATAR_BASE_URL = "https://image.tmdb.org/t/p/w185";

/**
 * Converts a TMDb review into the format expected
 * by the frontend review components.
 *
 * @param {object} review - Raw TMDb review.
 * @returns {object} Normalized TMDb review.
 */

function normalizeTmdbReview(review) {
    const avatarPath = review.author_details?.avatar_path;

    const avatar =
        avatarPath && avatarPath.startsWith("/")
            ? `${TMDB_AVATAR_BASE_URL}${avatarPath}`
            : avatarPath || null;

    return {
        id: review.id,
        source: "tmdb",
        displaySource: "TMDb",
        author: review.author || "Anonymous",
        avatar,
        rating: review.author_details?.rating ?? null,
        reviewText: review.content || "",
        createdAt: review.created_at || null,
        updatedAt: review.updated_at || null,
        isOwner: false,
    };
}

export default normalizeTmdbReview;
