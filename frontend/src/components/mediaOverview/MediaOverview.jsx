import "./MediaOverview.css";

/**
 * Displays the full overview of a media item.
 */

function MediaOverview({ overview }) {
    return (
        <section className="section media-overview-section">
            <div className="container">
                <h2 className="media-overview-title">Overview</h2>

                <p className="media-overview-text">{overview}</p>
            </div>
        </section>
    );
}

export default MediaOverview;
