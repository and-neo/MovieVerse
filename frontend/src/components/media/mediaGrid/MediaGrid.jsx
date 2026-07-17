import "./MediaGrid.css";

import MediaCard from "../mediaCard/MediaCard";

/**
 * Displays a responsive grid of media cards.
 */

function MediaGrid({ items = [] }) {
    return (
        <div className="media-grid">
            {items.map((item) => (
                <MediaCard key={item.id} item={item} />
            ))}
        </div>
    );
}

export default MediaGrid;
