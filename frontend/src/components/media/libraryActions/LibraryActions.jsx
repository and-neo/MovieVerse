import { useLocation, useNavigate } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";
import useFavorites from "../../../hooks/useFavorites";
import useWatchlist from "../../../hooks/useWatchlist";

import "./LibraryActions.css";

/**
 * Displays favorite and watchlist actions for a media item.
 *
 * @param {Object} props
 * @param {"movie"|"tv"} props.contentType
 * @param {Number} props.tmdbId
 * @param {String} props.title
 * @param {String|null} props.posterPath
 */

function LibraryActions({ contentType, tmdbId, title, posterPath }) {
    const navigate = useNavigate();
    const location = useLocation();

    const { isAuthenticated } = useAuth();

    const {
        error: favoritesError,
        isFavorite,
        toggleFavorite,
        isFavoritePending,
    } = useFavorites();

    const {
        error: watchlistError,
        isInWatchlist,
        toggleWatchlist,
        isWatchlistPending,
    } = useWatchlist();

    const favoriteActive = isFavorite(contentType, tmdbId);
    const watchlistActive = isInWatchlist(contentType, tmdbId);

    const favoritePending = isFavoritePending(contentType, tmdbId);
    const watchlistPending = isWatchlistPending(contentType, tmdbId);

    const libraryItem = {
        contentType,
        tmdbId,
        title,
        posterPath: posterPath || null,
    };

    /**
     * Redirects guest users to login while preserving the current page.
     */

    const redirectToLogin = () => {
        navigate("/login", {
            state: {
                from: location,
                message: "Please log in to manage your library.",
            },
        });
    };

    /**
     * Adds or removes the media item from favorites.
     */

    const handleFavoriteClick = async () => {
        if (!isAuthenticated) {
            redirectToLogin();
            return;
        }

        try {
            console.log(libraryItem);
            await toggleFavorite(libraryItem);
        } catch {
            // The hook exposes the request error to the component.
        }
    };

    /**
     * Adds or removes the media item from the watchlist.
     */

    const handleWatchlistClick = async () => {
        if (!isAuthenticated) {
            redirectToLogin();
            return;
        }

        try {
            await toggleWatchlist(libraryItem);
        } catch {
            // The hook exposes the request error to the component.
        }
    };

    const error = favoritesError || watchlistError;

    return (
        <div className="library-actions">
            <div className="library-actions__buttons">
                <button
                    className={`library-actions__button ${
                        favoriteActive ? "library-actions__button--active" : ""
                    }`}
                    type="button"
                    aria-pressed={favoriteActive}
                    disabled={favoritePending}
                    onClick={handleFavoriteClick}
                >
                    <span className="library-actions__icon" aria-hidden="true">
                        {favoriteActive ? "♥" : "♡"}
                    </span>

                    <span>
                        {favoritePending
                            ? "Updating..."
                            : favoriteActive
                              ? "Remove from Favorites"
                              : "Add to Favorites"}
                    </span>
                </button>

                <button
                    className={`library-actions__button ${
                        watchlistActive ? "library-actions__button--active" : ""
                    }`}
                    type="button"
                    aria-pressed={watchlistActive}
                    disabled={watchlistPending}
                    onClick={handleWatchlistClick}
                >
                    <span className="library-actions__icon" aria-hidden="true">
                        {watchlistActive ? "✓" : "+"}
                    </span>

                    <span>
                        {watchlistPending
                            ? "Updating..."
                            : watchlistActive
                              ? "Remove from Watchlist"
                              : "Add to Watchlist"}
                    </span>
                </button>
            </div>

            {error && (
                <p className="library-actions__error" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}

export default LibraryActions;
