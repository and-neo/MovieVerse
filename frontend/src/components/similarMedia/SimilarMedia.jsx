import "./SimilarMedia.css";

import MediaGrid from "../mediaGrid/MediaGrid";

/**
 * Displays media items similar to the selected title.
 */

function SimilarMedia({ items = [] }) {
    if (items.length === 0) {
        return null;
    }

    return (
        <section className="section">
            <div className="container">
                <h2 className="section-title">Similar Titles</h2>

                <MediaGrid items={items} />
            </div>
        </section>
    );
}

export default SimilarMedia;
