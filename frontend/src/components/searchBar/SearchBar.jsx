import "./SearchBar.css";

/**
 * Global search bar component.
 */

function SearchBar() {
    return (
        <section className="search-section">
            <div className="container">
                <form className="search-form">
                    <input
                        type="text"
                        placeholder="Search for movies or TV shows..."
                    />

                    <button type="submit">🔍</button>
                </form>
            </div>
        </section>
    );
}

export default SearchBar;
