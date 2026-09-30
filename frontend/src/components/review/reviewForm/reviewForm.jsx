import { useEffect, useState } from "react";

import "./reviewForm.css";

/**
 * Displays the form used to create or edit a MovieVerse review.
 *
 * @param {object} props
 * @param {"create"|"edit"} props.mode - Form operation mode.
 * @param {object|null} props.initialData - Existing review data in edit mode.
 * @param {Function} props.onSubmit - Handles form submission.
 * @param {Function} props.onCancel - Closes the form.
 */

function ReviewForm({
    mode = "create",
    initialData = null,
    onSubmit,
    onCancel,
}) {
    const isEditMode = mode === "edit";

    const [formData, setFormData] = useState({
        rating: initialData?.rating?.toString() || "",
        reviewText: initialData?.reviewText || "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const reviewLength = formData.reviewText.length;

    useEffect(() => {
        setFormData({
            rating: initialData?.rating?.toString() || "",
            reviewText: initialData?.reviewText || "",
        });

        setErrorMessage("");
    }, [initialData]);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setErrorMessage("");

        const numericRating = Number(formData.rating);
        const trimmedReviewText = formData.reviewText.trim();

        if (
            !Number.isInteger(numericRating) ||
            numericRating < 1 ||
            numericRating > 10
        ) {
            setErrorMessage("Rating must be a whole number from 1 to 10.");
            return;
        }

        if (trimmedReviewText.length < 10) {
            setErrorMessage("Review must contain at least 10 characters.");
            return;
        }

        if (trimmedReviewText.length > 2000) {
            setErrorMessage("Review cannot exceed 2000 characters.");
            return;
        }

        setIsSubmitting(true);

        try {
            await onSubmit({
                rating: numericRating,
                reviewText: trimmedReviewText,
            });

            if (!isEditMode) {
                setFormData({
                    rating: "",
                    reviewText: "",
                });
            }
        } catch (error) {
            setErrorMessage(
                error.message ||
                    `Unable to ${
                        isEditMode ? "update" : "submit"
                    } your review.`,
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <header className="review-form-header">
                <div>
                    <h3 className="review-form-title">
                        {isEditMode ? "Edit Your Review" : "Write a Review"}
                    </h3>

                    <p className="review-form-description">
                        {isEditMode
                            ? "Update your rating or review."
                            : "Share your opinion with the MovieVerse community."}
                    </p>
                </div>

                <button
                    type="button"
                    className="review-form-cancel"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
            </header>

            <div className="review-form-group">
                <label className="review-form-label" htmlFor="review-rating">
                    Rating
                </label>

                <select
                    className="review-form-select"
                    id="review-rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                >
                    <option value="">Select a rating</option>

                    {Array.from({ length: 10 }, (_, index) => {
                        const rating = index + 1;

                        return (
                            <option key={rating} value={rating}>
                                {rating}/10
                            </option>
                        );
                    })}
                </select>
            </div>

            <div className="review-form-group">
                <div className="review-form-label-row">
                    <label className="review-form-label" htmlFor="review-text">
                        Review
                    </label>

                    <span className="review-character-count">
                        {reviewLength}/2000
                    </span>
                </div>

                <textarea
                    className="review-form-textarea"
                    id="review-text"
                    name="reviewText"
                    value={formData.reviewText}
                    onChange={handleChange}
                    placeholder="Write your review..."
                    rows="6"
                    minLength="10"
                    maxLength="2000"
                    disabled={isSubmitting}
                    required
                />
            </div>

            {errorMessage && (
                <p className="review-form-error" role="alert">
                    {errorMessage}
                </p>
            )}

            <button
                type="submit"
                className="btn review-form-submit"
                disabled={isSubmitting}
            >
                {isSubmitting
                    ? isEditMode
                        ? "Saving..."
                        : "Submitting..."
                    : isEditMode
                      ? "Save Changes"
                      : "Submit Review"}
            </button>
        </form>
    );
}

export default ReviewForm;
