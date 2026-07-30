import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";

import "./AccountActions.css";

/**
 * Displays destructive account actions and deletion confirmation.
 */

function AccountActions() {
    const { deleteAccount } = useContext(AuthContext);

    const navigate = useNavigate();

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const [actionMessage, setActionMessage] = useState("");
    const [isDeletingAccount, setIsDeletingAccount] = useState(false);

    function handleShowDeleteConfirmation() {
        setShowDeleteConfirmation(true);
        setActionMessage("");
    }

    function handleCancelDelete() {
        if (isDeletingAccount) {
            return;
        }

        setShowDeleteConfirmation(false);
        setActionMessage("");
    }

    async function handleConfirmDelete() {
        try {
            setIsDeletingAccount(true);
            setActionMessage("");

            await deleteAccount();

            navigate("/", {
                replace: true,
            });
        } catch (error) {
            setActionMessage(
                error.response?.data?.message ||
                    "Unable to delete your account.",
            );

            setShowDeleteConfirmation(false);
        } finally {
            setIsDeletingAccount(false);
        }
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
                            Are you sure you want to permanently delete your
                            account? This action cannot be undone.
                        </p>

                        <div className="delete-confirmation-actions">
                            <button
                                type="button"
                                className="btn account-delete-button"
                                onClick={handleConfirmDelete}
                                disabled={isDeletingAccount}
                            >
                                {isDeletingAccount
                                    ? "Deleting..."
                                    : "Yes, Delete Account"}
                            </button>

                            <button
                                type="button"
                                className="btn account-cancel-delete-button"
                                onClick={handleCancelDelete}
                                disabled={isDeletingAccount}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {actionMessage && (
                <p className="account-action-message" role="alert">
                    {actionMessage}
                </p>
            )}
        </section>
    );
}

export default AccountActions;
