import { useEffect, useRef, useState } from "react";

import "./ReviewCard.css";

/**
 * Displays a normalized MovieVerse or TMDb review.
 *
 * @param {object} props
 * @param {object} props.review - Normalized review data.
 */

function ReviewCard({ review, onEdit, onDelete, isDeleting = false }) {
    const reviewTextRef = useRef(null);

    const [isExpanded, setIsExpanded] = useState(false);
    const [canExpand, setCanExpand] = useState(false);

    const formattedDate = review.createdAt
        ? new Intl.DateTimeFormat("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
          }).format(new Date(review.createdAt))
        : null;

    const authorInitial = review.author
        ? review.author.charAt(0).toUpperCase()
        : "?";

    useEffect(() => {
        const reviewTextElement = reviewTextRef.current;

        if (!reviewTextElement) {
            return;
        }

        setIsExpanded(false);

        const checkTextOverflow = () => {
            setCanExpand(
                reviewTextElement.scrollHeight > reviewTextElement.clientHeight,
            );
        };

        checkTextOverflow();

        window.addEventListener("resize", checkTextOverflow);

        return () => {
            window.removeEventListener("resize", checkTextOverflow);
        };
    }, [review.reviewText]);

    const handleToggleExpanded = () => {
        setIsExpanded((currentValue) => !currentValue);
    };

    return (
        <article className="review-card">
            <header className="review-card-header">
                <div className="review-author-info">
                    {review.avatar ? (
                        <img
                            src={review.avatar}
                            alt={`${review.author}'s avatar`}
                            className="review-avatar"
                        />
                    ) : (
                        <div
                            className="review-avatar review-avatar-fallback"
                            aria-hidden="true"
                        >
                            {authorInitial}
                        </div>
                    )}

                    <div>
                        <div className="review-author-row">
                            <h3 className="review-author">{review.author}</h3>

                            <span className="review-source">
                                {review.displaySource}
                            </span>
                        </div>

                        {formattedDate && (
                            <time
                                className="review-date"
                                dateTime={review.createdAt}
                            >
                                {formattedDate}
                            </time>
                        )}
                    </div>
                </div>

                {review.rating !== null && review.rating !== undefined && (
                    <span className="review-rating">⭐ {review.rating}/10</span>
                )}
            </header>

            <div className="review-content">
                <p
                    ref={reviewTextRef}
                    className={`review-comment ${
                        isExpanded ? "review-comment-expanded" : ""
                    }`}
                >
                    {review.reviewText}
                </p>

                {canExpand && (
                    <button
                        type="button"
                        className="review-read-more"
                        aria-expanded={isExpanded}
                        onClick={handleToggleExpanded}
                    >
                        {isExpanded ? "Show less" : "Show more"}
                    </button>
                )}
            </div>

            {review.isOwner && (
                <footer className="review-card-footer">
                    <span className="review-owner-label">Your review</span>

                    <div className="review-card-actions">
                        <button
                            type="button"
                            className="review-action-button"
                            onClick={() => onEdit?.(review)}
                            disabled={isDeleting}
                        >
                            Edit
                        </button>

                        <button
                            type="button"
                            className="review-action-button review-delete-button"
                            onClick={() => onDelete?.(review)}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </footer>
            )}
        </article>
    );
}

export default ReviewCard;
