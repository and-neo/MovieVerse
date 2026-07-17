import "./ReviewList.css";

import ReviewCard from "../reviewCard/ReviewCard";

/**
 * Displays a collection of user reviews.
 */

function ReviewList({ reviews = [] }) {
    if (reviews.length === 0) {
        return null;
    }

    return (
        <section className="section">
            <div className="container">
                <h2 className="section-title">Reviews</h2>

                <div className="reviews-list">
                    {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ReviewList;
