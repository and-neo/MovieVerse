const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const TMDB_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";
const TMDB_PROFILE_BASE_URL = "https://image.tmdb.org/t/p/w185";

/**
 * Converts TMDb TV show details into the format expected
 * by the frontend media components.
 *
 * @param {object} tvShow - Raw TMDb TV show details.
 * @returns {object} Normalized TV show details.
 */
function normalizeTvShowDetails(tvShow) {
    const cast =
        tvShow.credits?.cast?.slice(0, 10).map((member) => ({
            id: member.id,
            name: member.name,
            character: member.character || "Unknown role",
            image: member.profile_path
                ? `${TMDB_PROFILE_BASE_URL}${member.profile_path}`
                : null,
        })) || [];

    const similarTvShows =
        tvShow.similar?.results?.slice(0, 4).map((show) => ({
            id: show.id,
            type: "tv",
            title: show.name,
            poster: show.poster_path
                ? `${TMDB_IMAGE_BASE_URL}${show.poster_path}`
                : null,
            releaseDate: show.first_air_date,
            voteAverage: show.vote_average ?? 0,
            genres: ["TV Show"],
        })) || [];

    return {
        id: tvShow.id,
        type: "tv",

        title: tvShow.name || "Untitled",

        tagline: tvShow.tagline || "",

        overview: tvShow.overview || "No overview is currently available.",

        poster: tvShow.poster_path
            ? `${TMDB_IMAGE_BASE_URL}${tvShow.poster_path}`
            : null,

        backdrop: tvShow.backdrop_path
            ? `${TMDB_BACKDROP_BASE_URL}${tvShow.backdrop_path}`
            : null,

        releaseDate: tvShow.first_air_date || "",

        voteAverage: tvShow.vote_average ?? 0,

        voteCount: tvShow.vote_count ?? 0,

        runtime: tvShow.episode_run_time?.[0] || null,

        seasons: tvShow.number_of_seasons || null,

        genres: tvShow.genres?.map((genre) => genre.name) || [],

        status: tvShow.status || "Unknown",

        originalLanguage: tvShow.original_language || "N/A",

        cast,

        reviews: [],

        similar: similarTvShows,
    };
}

export default normalizeTvShowDetails;
