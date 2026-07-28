import { Link } from "react-router-dom";

import "./SearchSuggestions.css";

/**
 * Displays search suggestion results below the search bar.
 *
 * @param {object} props
 * @param {Array} props.suggestions - Suggested movies and TV shows.
 * @param {boolean} props.isLoading - Indicates whether suggestions are loading.
 * @param {string} props.error - Suggestions loading error.
 * @param {Function} props.onSelect - Runs when a suggestion is selected.
 * @returns {JSX.Element|null}
 */

function SearchSuggestions({ suggestions, isLoading, error, onSelect }) {
    if (isLoading) {
        return (
            <div className="search-suggestions">
                <p className="search-suggestions__status">
                    Loading suggestions...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="search-suggestions">
                <p
                    className="search-suggestions__status search-suggestions__status--error"
                    role="alert"
                >
                    {error}
                </p>
            </div>
        );
    }

    if (suggestions.length === 0) {
        return (
            <div className="search-suggestions">
                <p className="search-suggestions__status">
                    No suggestions found.
                </p>
            </div>
        );
    }

    return (
        <div className="search-suggestions">
            <ul className="search-suggestions__list">
                {suggestions.map((suggestion) => {
                    const detailsPath =
                        suggestion.type === "movie"
                            ? `/movies/${suggestion.id}`
                            : `/tvshows/${suggestion.id}`;

                    const mediaLabel =
                        suggestion.type === "movie" ? "Movie" : "TV Show";

                    const releaseYear = suggestion.releaseDate
                        ? new Date(suggestion.releaseDate).getFullYear()
                        : null;

                    return (
                        <li
                            key={`${suggestion.type}-${suggestion.id}`}
                            className="search-suggestions__item"
                        >
                            <Link
                                to={detailsPath}
                                className="search-suggestions__link"
                                onClick={onSelect}
                            >
                                <div className="search-suggestions__poster-wrapper">
                                    {suggestion.poster ? (
                                        <img
                                            src={suggestion.poster}
                                            alt={`${suggestion.title} poster`}
                                            className="search-suggestions__poster"
                                        />
                                    ) : (
                                        <div className="search-suggestions__poster-placeholder">
                                            No image
                                        </div>
                                    )}
                                </div>

                                <div className="search-suggestions__content">
                                    <h3 className="search-suggestions__title">
                                        {suggestion.title}
                                    </h3>

                                    <p className="search-suggestions__metadata">
                                        {mediaLabel}
                                        {releaseYear && ` • ${releaseYear}`}
                                    </p>
                                </div>

                                <div className="search-suggestions__rating">
                                    <span aria-hidden="true">★</span>
                                    <span>
                                        {suggestion.voteAverage.toFixed(1)}
                                    </span>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default SearchSuggestions;
