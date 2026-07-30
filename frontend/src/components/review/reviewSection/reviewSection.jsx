import { useEffect, useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";

import "./ReviewSection.css";

import ReviewForm from "../reviewForm/ReviewForm";
import ReviewList from "../reviewList/ReviewList";

import {
    createReview,
    deleteReview,
    getReviews,
    updateReview,
} from "../../../services/reviewService";

import normalizeMovieVerseReview from "../../../utils/normalizeMovieVerseReview";
import useAuth from "../../../hooks/useAuth";

const REVIEWS_LIMIT = 5;

/**
 * Displays MovieVerse and TMDb reviews for a media item.
 *
 * @param {object} props
 * @param {"movie"|"tv"} props.contentType - Media type.
 * @param {number|string} props.tmdbId - TMDb media ID.
 * @param {Array} props.tmdbReviews - Normalized TMDb reviews.
 */

function ReviewSection({ contentType, tmdbId, tmdbReviews = [] }) {
    const { user, isAuthenticated } = useAuth();

    const [movieVerseReviews, setMovieVerseReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
    const [editingReview, setEditingReview] = useState(null);
    const [deletingReviewId, setDeletingReviewId] = useState(null);
    const [actionErrorMessage, setActionErrorMessage] = useState("");
    const reviewFormRef = useRef(null);

    const handleOpenCreateForm = () => {
        setEditingReview(null);
        setActionErrorMessage("");
        setIsReviewFormOpen(true);
    };

    const handleEditReview = (review) => {
        setEditingReview(review);
        setActionErrorMessage("");
        setIsReviewFormOpen(true);
    };

    const handleCloseReviewForm = () => {
        setIsReviewFormOpen(false);
        setEditingReview(null);
        setActionErrorMessage("");
    };

    const handleCreateReview = async (reviewData) => {
        const createdReview = await createReview({
            contentType,
            tmdbId,
            ...reviewData,
        });

        const normalizedReview = normalizeMovieVerseReview(
            createdReview,
            user?._id || user?.id || null,
        );

        setMovieVerseReviews((currentReviews) => [
            normalizedReview,
            ...currentReviews,
        ]);

        handleCloseReviewForm();
    };

    const handleUpdateReview = async (reviewData) => {
        if (!editingReview) {
            return;
        }

        const updatedReview = await updateReview(editingReview.id, reviewData);

        const normalizedReview = normalizeMovieVerseReview(
            updatedReview,
            user?._id || user?.id || null,
        );

        setMovieVerseReviews((currentReviews) =>
            currentReviews.map((review) =>
                review.id === normalizedReview.id ? normalizedReview : review,
            ),
        );

        handleCloseReviewForm();
    };

    const handleDeleteReview = async (review) => {
        const shouldDelete = window.confirm(
            "Are you sure you want to delete your review?",
        );

        if (!shouldDelete) {
            return;
        }

        try {
            setActionErrorMessage("");
            setDeletingReviewId(review.id);

            await deleteReview(review.id);

            setMovieVerseReviews((currentReviews) =>
                currentReviews.filter(
                    (currentReview) => currentReview.id !== review.id,
                ),
            );

            handleCloseReviewForm();
        } catch (error) {
            setActionErrorMessage(
                error.message || "Unable to delete your review.",
            );
        } finally {
            setDeletingReviewId(null);
        }
    };

    const ownerReview = useMemo(
        () => movieVerseReviews.find((review) => review.isOwner) || null,
        [movieVerseReviews],
    );

    useEffect(() => {
        if (!isReviewFormOpen || !reviewFormRef.current) {
            return;
        }

        reviewFormRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [isReviewFormOpen, editingReview]);

    useEffect(() => {
        let isMounted = true;

        const fetchReviews = async () => {
            try {
                setIsLoading(true);
                setErrorMessage("");

                const reviews = await getReviews(contentType, tmdbId);

                if (!isMounted) {
                    return;
                }

                const normalizedReviews = reviews.map((review) =>
                    normalizeMovieVerseReview(
                        review,
                        user?._id || user?.id || null,
                    ),
                );

                setMovieVerseReviews(normalizedReviews);
            } catch (error) {
                if (!isMounted) {
                    return;
                }

                setMovieVerseReviews([]);
                setErrorMessage(
                    error.message || "Unable to load MovieVerse reviews.",
                );
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchReviews();

        return () => {
            isMounted = false;
        };
    }, [contentType, tmdbId, user?._id, user?.id]);

    const visibleMovieVerseReviews = useMemo(() => {
        const otherReviews = movieVerseReviews.filter(
            (review) => !review.isOwner,
        );

        const orderedReviews = ownerReview
            ? [ownerReview, ...otherReviews]
            : otherReviews;

        return orderedReviews.slice(0, REVIEWS_LIMIT);
    }, [movieVerseReviews, ownerReview]);
    const visibleTmdbReviews = tmdbReviews.slice(0, REVIEWS_LIMIT);

    return (
        <section className="section review-section">
            <div className="container">
                <div className="review-section-header">
                    <div>
                        <h2 className="section-title">Reviews</h2>

                        <p className="review-section-description">
                            Read opinions from the MovieVerse community and TMDb
                            users.
                        </p>
                    </div>
                </div>

                <div className="review-contribution">
                    {!isAuthenticated ? (
                        <div className="review-login-prompt">
                            <div>
                                <h3>Join the discussion</h3>

                                <p>
                                    Sign in to rate this title and write a
                                    review.
                                </p>
                            </div>

                            <Link
                                to="/login"
                                state={{
                                    from: {
                                        pathname: window.location.pathname,
                                    },
                                }}
                                className="btn review-login-link"
                            >
                                Login to Review
                            </Link>
                        </div>
                    ) : isReviewFormOpen ? (
                        <div
                            ref={reviewFormRef}
                            className="review-form-wrapper"
                        >
                            <ReviewForm
                                mode={editingReview ? "edit" : "create"}
                                initialData={editingReview}
                                onSubmit={
                                    editingReview
                                        ? handleUpdateReview
                                        : handleCreateReview
                                }
                                onCancel={handleCloseReviewForm}
                            />
                        </div>
                    ) : ownerReview ? (
                        <div className="review-existing-message">
                            <p>
                                You have already reviewed this title. You can
                                edit or delete your review below.
                            </p>
                        </div>
                    ) : (
                        <button
                            type="button"
                            className="btn review-write-button"
                            onClick={handleOpenCreateForm}
                        >
                            Write a Review
                        </button>
                    )}

                    {actionErrorMessage && (
                        <p className="review-action-error" role="alert">
                            {actionErrorMessage}
                        </p>
                    )}
                </div>

                <div className="review-groups">
                    <section
                        className="review-group"
                        aria-labelledby="movieverse-reviews-title"
                    >
                        <div className="review-group-header">
                            <h3 id="movieverse-reviews-title">
                                MovieVerse Reviews
                            </h3>

                            {!isLoading && !errorMessage && (
                                <span className="review-count">
                                    {movieVerseReviews.length}
                                </span>
                            )}
                        </div>

                        {isLoading ? (
                            <p className="review-status">
                                Loading MovieVerse reviews...
                            </p>
                        ) : errorMessage ? (
                            <p className="review-status review-error">
                                {errorMessage}
                            </p>
                        ) : (
                            <ReviewList
                                reviews={visibleMovieVerseReviews}
                                emptyMessage="No MovieVerse reviews yet."
                                onEdit={handleEditReview}
                                onDelete={handleDeleteReview}
                                deletingReviewId={deletingReviewId}
                            />
                        )}
                    </section>

                    <section
                        className="review-group"
                        aria-labelledby="tmdb-reviews-title"
                    >
                        <div className="review-group-header">
                            <h3 id="tmdb-reviews-title">TMDb Reviews</h3>

                            <span className="review-count">
                                {tmdbReviews.length}
                            </span>
                        </div>

                        <ReviewList
                            reviews={visibleTmdbReviews}
                            emptyMessage="No TMDb reviews are currently available."
                        />
                    </section>
                </div>
            </div>
        </section>
    );
}

export default ReviewSection;
