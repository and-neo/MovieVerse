import { createContext, useEffect, useState } from "react";

import {
    deleteUserAccount,
    getCurrentUser,
    loginUser,
    registerUser,
    updateUserPassword,
    updateUserProfile,
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

    /**
     * Updates the authenticated user's profile.
     */

    const updateProfile = async (profileData) => {
        const updatedUser = await updateUserProfile(profileData);

        setUser(updatedUser);

        return updatedUser;
    };

    /**
     * Updates the authenticated user's password.
     */

    const changePassword = async (passwordData) => {
        return updateUserPassword(passwordData);
    };

    /**
     * Permanently deletes the authenticated user's account.
     */

    const deleteAccount = async () => {
        await deleteUserAccount();

        localStorage.removeItem("token");

        setToken(null);
        setUser(null);
    };

    const value = {
        user,
        token,
        isLoading,

        isAuthenticated: !!user,

        register,
        login,
        logout,
        refreshUser,
        updateProfile,
        changePassword,
        deleteAccount,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
