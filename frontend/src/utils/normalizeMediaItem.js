const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

/**
 * Converts a TMDb movie or TV show object into the format
 * expected by the frontend media components.
 *
 * @param {object} item - Raw TMDb media item.
 * @param {"movie"|"tv"} mediaType - Media type.
 * @returns {object} Normalized media item.
 */

function normalizeMediaItem(item, mediaType) {
    const isMovie = mediaType === "movie";

    return {
        id: item.id,
        type: mediaType,
        title: isMovie ? item.title : item.name,
        poster: item.poster_path
            ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}`
            : null,
        releaseDate: isMovie ? item.release_date : item.first_air_date,
        voteAverage: item.vote_average ?? 0,
        genres: [isMovie ? "Movie" : "TV Show"],
    };
}

export default normalizeMediaItem;
