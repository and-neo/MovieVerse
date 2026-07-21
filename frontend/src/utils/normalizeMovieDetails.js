const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const TMDB_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";
const TMDB_PROFILE_BASE_URL = "https://image.tmdb.org/t/p/w185";

/**
 * Converts TMDb movie details into the format expected
 * by the frontend media components.
 *
 * @param {object} movie - Raw TMDb movie details.
 * @returns {object} Normalized movie details.
 */

function normalizeMovieDetails(movie) {
    const cast =
        movie.credits?.cast?.slice(0, 10).map((member) => ({
            id: member.id,
            name: member.name,
            character: member.character || "Unknown role",
            image: member.profile_path
                ? `${TMDB_PROFILE_BASE_URL}${member.profile_path}`
                : null,
        })) || [];

    const similarMovies =
        movie.similar?.results?.slice(0, 4).map((similarMovie) => ({
            id: similarMovie.id,
            type: "movie",
            title: similarMovie.title,
            poster: similarMovie.poster_path
                ? `${TMDB_IMAGE_BASE_URL}${similarMovie.poster_path}`
                : null,
            releaseDate: similarMovie.release_date,
            voteAverage: similarMovie.vote_average ?? 0,
            genres: ["Movie"],
        })) || [];

    return {
        id: movie.id,
        type: "movie",
        title: movie.title || "Untitled",
        tagline: movie.tagline || "",
        overview: movie.overview || "No overview is currently available.",
        poster: movie.poster_path
            ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
            : null,
        backdrop: movie.backdrop_path
            ? `${TMDB_BACKDROP_BASE_URL}${movie.backdrop_path}`
            : null,
        releaseDate: movie.release_date || "",
        voteAverage: movie.vote_average ?? 0,
        voteCount: movie.vote_count ?? 0,
        runtime: movie.runtime || null,
        genres: movie.genres?.map((genre) => genre.name) || [],
        status: movie.status || "Unknown",
        originalLanguage: movie.original_language || "N/A",
        cast,
        reviews: [],
        similar: similarMovies,
    };
}

export default normalizeMovieDetails;
