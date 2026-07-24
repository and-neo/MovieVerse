import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

/**
 * Returns the global authentication context.
 */

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider.");
    }

    return context;
};

export default useAuth;
