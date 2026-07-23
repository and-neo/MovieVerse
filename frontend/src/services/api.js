import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!apiBaseUrl) {
    throw new Error(
        "VITE_API_BASE_URL is missing from the frontend environment.",
    );
}

const api = axios.create({
    baseURL: apiBaseUrl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Adds the authentication token to protected API requests.
 */

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const apiError = {
            message:
                error.response?.data?.message ||
                "Unable to complete the request.",
            statusCode: error.response?.status || 500,
        };

        return Promise.reject(apiError);
    },
);

export default api;
