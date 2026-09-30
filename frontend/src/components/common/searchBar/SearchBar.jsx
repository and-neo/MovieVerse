import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { searchMedia } from "../../../services/searchService";

import SearchSuggestions from "../searchSuggestions/SearchSuggestions";

import "./SearchBar.css";

/**
 * Displays the home page search bar and media suggestions.
 *
 * @returns {JSX.Element}
 */

function SearchBar() {
    const navigate = useNavigate();
    const searchBarRef = useRef(null);

    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const [suggestionsError, setSuggestionsError] = useState("");
    const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

    useEffect(() => {
        const normalizedQuery = query.trim();
        let isCurrentRequest = true;

        if (normalizedQuery.length < 3) {
            setSuggestions([]);
            setIsLoadingSuggestions(false);
            setSuggestionsError("");
            setIsSuggestionsOpen(false);
            return undefined;
        }

        const debounceTimer = setTimeout(async () => {
            try {
                setIsLoadingSuggestions(true);
                setSuggestionsError("");

                const results = await searchMedia(normalizedQuery);

                if (!isCurrentRequest) {
                    return;
                }

                setSuggestions(results.slice(0, 10));
                setIsSuggestionsOpen(true);
            } catch (error) {
                if (!isCurrentRequest) {
                    return;
                }

                setSuggestions([]);
                setSuggestionsError(
                    error.message || "Unable to load search suggestions.",
                );
                setIsSuggestionsOpen(true);
            } finally {
                if (isCurrentRequest) {
                    setIsLoadingSuggestions(false);
                }
            }
        }, 300);

        return () => {
            isCurrentRequest = false;
            clearTimeout(debounceTimer);
        };
    }, [query]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                searchBarRef.current &&
                !searchBarRef.current.contains(event.target)
            ) {
                setIsSuggestionsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const normalizedQuery = query.trim();

        if (!normalizedQuery) {
            return;
        }

        setSuggestions([]);
        setIsSuggestionsOpen(false);

        navigate(`/search?q=${encodeURIComponent(normalizedQuery)}`);
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleInputFocus = () => {
        if (
            query.trim().length >= 3 &&
            (suggestions.length > 0 || isLoadingSuggestions || suggestionsError)
        ) {
            setIsSuggestionsOpen(true);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Escape") {
            setIsSuggestionsOpen(false);
            event.currentTarget.blur();
        }
    };

    const handleSuggestionSelect = () => {
        setSuggestions([]);
        setIsSuggestionsOpen(false);
    };

    return (
        <section className="search-section">
            <div className="container">
                <div ref={searchBarRef} className="search-bar-wrapper">
                    <form className="search-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={query}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            onKeyDown={handleKeyDown}
                            placeholder="Search for movies or TV shows..."
                            aria-label="Search for movies or TV shows"
                            autoComplete="off"
                        />

                        <button type="submit" aria-label="Submit search">
                            🔍
                        </button>
                    </form>

                    {isSuggestionsOpen && (
                        <SearchSuggestions
                            suggestions={suggestions}
                            isLoading={isLoadingSuggestions}
                            error={suggestionsError}
                            onSelect={handleSuggestionSelect}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}

export default SearchBar;
