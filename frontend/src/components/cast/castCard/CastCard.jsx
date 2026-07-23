import "./CastCard.css";

/**
 * Displays a cast member and their character.
 */

function CastCard({ member }) {
    return (
        <article className="cast-card">
            {member.image ? (
                <img
                    src={member.image}
                    alt={member.name}
                    className="cast-card-image"
                />
            ) : (
                <div className="cast-card-image cast-card-placeholder">
                    MovieVerse
                </div>
            )}

            <div className="cast-card-content">
                <h3 className="cast-card-name">{member.name}</h3>

                <p className="cast-card-character">{member.character}</p>
            </div>
        </article>
    );
}

export default CastCard;
