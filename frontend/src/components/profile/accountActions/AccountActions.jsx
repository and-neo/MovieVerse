import { useState } from "react";

import "./AccountActions.css";

/**
 * Displays destructive account actions and deletion confirmation.
 */

function AccountActions() {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const [actionMessage, setActionMessage] = useState("");

    function handleShowDeleteConfirmation() {
        setShowDeleteConfirmation(true);
        setActionMessage("");
    }

    function handleCancelDelete() {
        setShowDeleteConfirmation(false);
    }

    function handleConfirmDelete() {
        setActionMessage(
            "Account deletion will be connected to the backend later.",
        );

        setShowDeleteConfirmation(false);
    }

    return (
        <section className="profile-card account-actions">
            <div className="account-actions-header">
                <h2 className="account-actions-title">Account Actions</h2>

                <p className="account-actions-description">
                    Manage permanent actions related to your account.
                </p>
            </div>

            <div className="account-action-section account-danger-section">
                <div>
                    <h3 className="account-action-title">Delete Account</h3>

                    <p className="account-action-description">
                        Permanently delete your account and account data.
                    </p>
                </div>

                {!showDeleteConfirmation && (
                    <button
                        type="button"
                        className="btn account-delete-button"
                        onClick={handleShowDeleteConfirmation}
                    >
                        Delete Account
                    </button>
                )}

                {showDeleteConfirmation && (
                    <div className="delete-confirmation">
                        <p className="delete-confirmation-message" role="alert">
                            Are you sure you want to delete your account?
                        </p>

                        <div className="delete-confirmation-actions">
                            <button
                                type="button"
                                className="btn account-delete-button"
                                onClick={handleConfirmDelete}
                            >
                                Yes, Delete Account
                            </button>

                            <button
                                type="button"
                                className="btn account-cancel-delete-button"
                                onClick={handleCancelDelete}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {actionMessage && (
                <p className="account-action-message" role="status">
                    {actionMessage}
                </p>
            )}
        </section>
    );
}

export default AccountActions;
