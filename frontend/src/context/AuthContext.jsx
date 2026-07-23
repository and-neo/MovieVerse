import { createContext, useEffect, useState } from "react";

import {
    getCurrentUser,
    loginUser,
    registerUser,
} from "../services/authService";

export const AuthContext = createContext();

/**
 * Provides global authentication state.
 */

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [token, setToken] = useState(localStorage.getItem("token"));

    const [isLoading, setIsLoading] = useState(true);

    /**
     * Registers a new user.
     */

    const register = async (userData) => {
        const data = await registerUser(userData);

        localStorage.setItem("token", data.token);

        setToken(data.token);
        setUser(data.user);

        return data.user;
    };

    /**
     * Logs in an existing user.
     */

    const login = async (credentials) => {
        const data = await loginUser(credentials);

        localStorage.setItem("token", data.token);

        setToken(data.token);
        setUser(data.user);

        return data.user;
    };

    /**
     * Logs out the current user.
     */

    const logout = () => {
        localStorage.removeItem("token");

        setToken(null);
        setUser(null);
    };

    /**
     * Refreshes the authenticated user's data.
     */

    const refreshUser = async () => {
        try {
            const currentUser = await getCurrentUser();

            setUser(currentUser);
        } catch {
            logout();
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const currentUser = await getCurrentUser();

                setUser(currentUser);
            } catch {
                logout();
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, [token]);

    const value = {
        user,
        token,
        isLoading,

        isAuthenticated: !!user,

        register,
        login,
        logout,
        refreshUser,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export { AuthProvider };
