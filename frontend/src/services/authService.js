import api from "./api";

/**
 * Registers a new user.
 *
 * @param {Object} userData
 * @param {string} userData.username
 * @param {string} userData.email
 * @param {string} userData.password
 * @returns {Promise<Object>}
 */

const registerUser = async (userData) => {
    const response = await api.post("/auth/register", userData);

    return response.data.data;
};

/**
 * Authenticates a user using an email address or username.
 *
 * @param {Object} credentials
 * @param {string} credentials.identifier
 * @param {string} credentials.password
 * @returns {Promise<Object>}
 */

const loginUser = async (credentials) => {
    const response = await api.post("/auth/login", credentials);

    return response.data.data;
};

/**
 * Retrieves the authenticated user's profile.
 *
 * @returns {Promise<Object>}
 */

const getCurrentUser = async () => {
    const response = await api.get("/auth/profile");

    return response.data.data.user;
};

export { getCurrentUser, loginUser, registerUser };
