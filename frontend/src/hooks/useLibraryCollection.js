import { useCallback, useEffect, useState } from "react";

import useAuth from "./useAuth";

/**
 * Manages a user's favorites or watchlist collection.
 *
 * @param {Function} getItems
 * @param {Function} addItem
 * @param {Function} removeItem
 * @returns {Object}
 */

function useLibraryCollection(getItems, addItem, removeItem) {
    const { isAuthenticated } = useAuth();

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pendingItemKey, setPendingItemKey] = useState(null);
    const [error, setError] = useState(null);

    /**
     * Loads the authenticated user's library collection.
     */

    const fetchItems = useCallback(async () => {
        if (!isAuthenticated) {
            setItems([]);
            setError(null);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const collection = await getItems();

            setItems(collection);
        } catch (requestError) {
            const message =
                requestError.response?.data?.message ||
                "Unable to load your library.";

            setError(message);
        } finally {
            setIsLoading(false);
        }
    }, [getItems, isAuthenticated]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    /**
     * Checks whether a media item exists in the collection.
     *
     * @param {String} contentType
     * @param {Number|String} tmdbId
     * @returns {Boolean}
     */

    const hasItem = useCallback(
        (contentType, tmdbId) => {
            return items.some(
                (item) =>
                    item.contentType === contentType &&
                    item.tmdbId === Number(tmdbId),
            );
        },
        [items],
    );

    /**
     * Adds a media item to the collection.
     *
     * @param {Object} item
     */

    const add = useCallback(
        async (item) => {
            const itemKey = `${item.contentType}-${item.tmdbId}`;

            try {
                setPendingItemKey(itemKey);
                setError(null);

                const updatedItems = await addItem(item);

                setItems(updatedItems);
            } catch (requestError) {
                const message =
                    requestError.response?.data?.message ||
                    "Unable to add this item.";

                setError(message);
                throw requestError;
            } finally {
                setPendingItemKey(null);
            }
        },
        [addItem],
    );

    /**
     * Removes a media item from the collection.
     *
     * @param {String} contentType
     * @param {Number|String} tmdbId
     */

    const remove = useCallback(
        async (contentType, tmdbId) => {
            const itemKey = `${contentType}-${tmdbId}`;

            try {
                setPendingItemKey(itemKey);
                setError(null);

                const updatedItems = await removeItem(contentType, tmdbId);

                setItems(updatedItems);
            } catch (requestError) {
                const message =
                    requestError.response?.data?.message ||
                    "Unable to remove this item.";

                setError(message);
                throw requestError;
            } finally {
                setPendingItemKey(null);
            }
        },
        [removeItem],
    );

    /**
     * Adds or removes a media item depending on its current state.
     *
     * @param {Object} item
     */

    const toggle = useCallback(
        async (item) => {
            const { contentType, tmdbId } = item;

            if (hasItem(contentType, tmdbId)) {
                await remove(contentType, tmdbId);
                return;
            }

            await add(item);
        },
        [add, hasItem, remove],
    );

    /**
     * Checks whether a specific item is currently being updated.
     *
     * @param {String} contentType
     * @param {Number|String} tmdbId
     * @returns {Boolean}
     */

    const isItemPending = useCallback(
        (contentType, tmdbId) => {
            return pendingItemKey === `${contentType}-${tmdbId}`;
        },
        [pendingItemKey],
    );

    return {
        items,
        isLoading,
        error,
        fetchItems,
        hasItem,
        add,
        remove,
        toggle,
        isItemPending,
    };
}

export default useLibraryCollection;
