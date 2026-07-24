const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MOVIE_GENRES = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
};

const TV_GENRES = {
    10759: "Action & Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    10762: "Kids",
    9648: "Mystery",
    10763: "News",
    10764: "Reality",
    10765: "Sci-Fi & Fantasy",
    10766: "Soap",
    10767: "Talk",
    10768: "War & Politics",
    37: "Western",
};

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
    const genreMap = isMovie ? MOVIE_GENRES : TV_GENRES;

    const genres = Array.isArray(item.genre_ids)
        ? item.genre_ids.map((genreId) => genreMap[genreId]).filter(Boolean)
        : [];

    return {
        id: item.id,
        type: mediaType,
        title: isMovie ? item.title : item.name,

        posterPath: item.poster_path || null,

        poster: item.poster_path
            ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}`
            : null,

        releaseDate: isMovie ? item.release_date : item.first_air_date,

        voteAverage: item.vote_average ?? 0,
        genres,
    };
}

export default normalizeMediaItem;
