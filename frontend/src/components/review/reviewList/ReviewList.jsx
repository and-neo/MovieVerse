import "./ReviewList.css";

import ReviewCard from "../reviewCard/ReviewCard";

/**
 * Displays a collection of normalized reviews.
 */

function ReviewList({
    reviews = [],
    emptyMessage = "No reviews are currently available.",
    onEdit,
    onDelete,
    deletingReviewId = null,
}) {
    if (reviews.length === 0) {
        return <p className="reviews-empty">{emptyMessage}</p>;
    }

    return (
        <div className="reviews-list">
            {reviews.map((review) => (
                <ReviewCard
                    key={review.id}
                    review={review}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    isDeleting={deletingReviewId === review.id}
                />
            ))}
        </div>
    );
}

export default ReviewList;
