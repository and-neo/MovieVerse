import "./CastList.css";

import CastCard from "../castCard/CastCard";

/**
 * Displays the cast of a movie or TV show.
 */

function CastList({ cast = [] }) {
    if (cast.length === 0) {
        return null;
    }

    return (
        <section className="section">
            <div className="container">
                <h2 className="section-title">Cast</h2>

                <div className="cast-grid">
                    {cast.map((member) => (
                        <CastCard key={member.id} member={member} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CastList;
