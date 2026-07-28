import api from "./api";

import normalizeMediaItem from "../utils/normalizeMediaItem";

/**
 * Searches for movies and TV shows.
 *
 * @param {string} query - Search term entered by the user.
 * @returns {Promise<Array>} Matching movie and TV show results.
 */

export async function searchMedia(query) {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
        return [];
    }

    const response = await api.get("/search", {
        params: {
            query: normalizedQuery,
        },
    });

    const results = response.data.data.results;

    if (!Array.isArray(results)) {
        return [];
    }

    return results.map((item) => normalizeMediaItem(item)).filter(Boolean);
}
