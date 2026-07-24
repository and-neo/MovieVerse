import { Link } from "react-router-dom";

import "./ProfileStats.css";

/**
 * Displays the user's activity statistics.
 */

function ProfileStats({ favoritesCount, watchlistCount }) {
    return (
        <section className="profile-card profile-stats">
            <h2 className="profile-stats-title">Activity</h2>

            <div className="profile-stats-grid">
                <Link
                    to="/library"
                    state={{ section: "favorites" }}
                    className="profile-stat"
                    aria-label={`View ${favoritesCount} favorites`}
                >
                    <span className="profile-stat-value">{favoritesCount}</span>

                    <span className="profile-stat-label">Favorites</span>
                </Link>

                <Link
                    to="/library"
                    state={{ section: "watchlist" }}
                    className="profile-stat"
                    aria-label={`View ${watchlistCount} watchlist items`}
                >
                    <span className="profile-stat-value">{watchlistCount}</span>

                    <span className="profile-stat-label">Watchlist</span>
                </Link>
            </div>
        </section>
    );
}

export default ProfileStats;
