import "./ProfileStats.css";

/**
 * Displays the user's activity statistics.
 */

function ProfileStats({ user }) {
    return (
        <section className="profile-card profile-stats">
            <h2 className="profile-stats-title">Activity</h2>

            <div className="profile-stats-grid">
                <div className="profile-stat">
                    <span className="profile-stat-value">
                        {user.favoritesCount}
                    </span>

                    <span className="profile-stat-label">Favorites</span>
                </div>

                <div className="profile-stat">
                    <span className="profile-stat-value">
                        {user.watchlistCount}
                    </span>

                    <span className="profile-stat-label">Watchlist</span>
                </div>
            </div>
        </section>
    );
}

export default ProfileStats;
