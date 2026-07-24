import { useContext } from "react";

import LibraryContext from "../context/LibraryContext";

/**
 * Returns the shared library context.
 *
 * @returns {Object}
 */

function useLibrary() {
    const context = useContext(LibraryContext);

    if (!context) {
        throw new Error("useLibrary must be used within a LibraryProvider.");
    }

    return context;
}

export default useLibrary;
