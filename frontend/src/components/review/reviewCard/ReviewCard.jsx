import "./ReviewCard.css";

/**
 * Displays a user review.
 */

function ReviewCard({ review }) {
    return (
        <article className="review-card">
            <header className="review-card-header">
                <h3 className="review-author">{review.author}</h3>

                <span className="review-rating">⭐ {review.rating}/5</span>
            </header>

            <p className="review-comment">{review.comment}</p>
        </article>
    );
}

export default ReviewCard;
