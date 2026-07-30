import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";

import "./ProfileEditForm.css";

/**
 * Displays independent forms for updating the user's
 * username, password and avatar.
 */

function ProfileEditForm({ user, onCancel, formRef }) {
    // Username state

    const [username, setUsername] = useState(user.username);
    const [usernameMessage, setUsernameMessage] = useState("");
    const [usernameMessageType, setUsernameMessageType] = useState("");

    // Password state

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordMessageType, setPasswordMessageType] = useState("");

    // Avatar state

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(user.avatarUrl);
    const [avatarMessage, setAvatarMessage] = useState("");

    // Derived values

    const userInitial = user.username.charAt(0).toUpperCase();

    // Updating states

    const { updateProfile, changePassword } = useContext(AuthContext);

    const [isUpdatingUsername, setIsUpdatingUsername] = useState(false);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

    useEffect(() => {
        setUsername(user.username);
    }, [user.username]);

    // Clean up temporary avatar preview URLs

    useEffect(() => {
        return () => {
            if (avatarPreview?.startsWith("blob:")) {
                URL.revokeObjectURL(avatarPreview);
            }
        };
    }, [avatarPreview]);

    // Username handlers

    function handleUsernameChange(event) {
        setUsername(event.target.value);
        setUsernameMessage("");
        setUsernameMessageType("");
    }

    async function handleUsernameSubmit(event) {
        event.preventDefault();

        const trimmedUsername = username.trim();

        if (!trimmedUsername) {
            setUsernameMessage("Username is required.");
            setUsernameMessageType("error");
            return;
        }

        if (trimmedUsername.length < 3) {
            setUsernameMessage("Username must contain at least 3 characters.");
            setUsernameMessageType("error");
            return;
        }

        if (trimmedUsername.toLowerCase() === user.username.toLowerCase()) {
            setUsernameMessage("Please enter a different username.");
            setUsernameMessageType("error");
            return;
        }

        try {
            setIsUpdatingUsername(true);
            setUsernameMessage("");

            await updateProfile({
                username: trimmedUsername,
            });

            setUsernameMessage("Username updated successfully.");
            setUsernameMessageType("success");
        } catch (error) {
            setUsernameMessage(
                error.response?.data?.message || "Unable to update username.",
            );
            setUsernameMessageType("error");
        } finally {
            setIsUpdatingUsername(false);
        }
    }

    // Password handlers

    function handlePasswordChange(event) {
        const { name, value } = event.target;

        setPasswordData((currentData) => ({
            ...currentData,
            [name]: value,
        }));

        setPasswordMessage("");
        setPasswordMessageType("");
    }

    async function handlePasswordSubmit(event) {
        event.preventDefault();

        const { currentPassword, newPassword, confirmPassword } = passwordData;

        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordMessage("All password fields are required.");
            setPasswordMessageType("error");
            return;
        }

        if (newPassword.length < 8) {
            setPasswordMessage(
                "The new password must contain at least 8 characters.",
            );
            setPasswordMessageType("error");
            return;
        }

        if (newPassword === currentPassword) {
            setPasswordMessage(
                "The new password must be different from the current password.",
            );
            setPasswordMessageType("error");
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordMessage("Passwords do not match.");
            setPasswordMessageType("error");
            return;
        }

        try {
            setIsUpdatingPassword(true);
            setPasswordMessage("");

            const message = await changePassword({
                currentPassword,
                newPassword,
            });

            setPasswordMessage(message || "Password updated successfully.");
            setPasswordMessageType("success");

            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
            setPasswordMessage(
                error.response?.data?.message || "Unable to update password.",
            );
            setPasswordMessageType("error");
        } finally {
            setIsUpdatingPassword(false);
        }
    }

    // Avatar handlers

    function handleAvatarChange(event) {
        const selectedFile = event.target.files[0];

        setAvatarMessage("");

        if (!selectedFile) {
            return;
        }

        if (!selectedFile.type.startsWith("image/")) {
            setAvatarFile(null);
            setAvatarMessage("Please select an image file.");
            return;
        }

        if (avatarPreview?.startsWith("blob:")) {
            URL.revokeObjectURL(avatarPreview);
        }

        const previewUrl = URL.createObjectURL(selectedFile);

        setAvatarFile(selectedFile);
        setAvatarPreview(previewUrl);
    }

    function handleAvatarSubmit(event) {
        event.preventDefault();

        if (!avatarFile) {
            setAvatarMessage("Please select an avatar image.");
            return;
        }

        setAvatarMessage(
            "Avatar is ready. File upload will be added with the backend.",
        );
    }

    return (
        <section ref={formRef} className="profile-card profile-edit-form">
            <div className="profile-edit-header">
                <div>
                    <h2 className="profile-edit-title">Edit Profile</h2>

                    <p className="profile-edit-description">
                        Update your account information.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn profile-cancel-button"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>

            <form
                className="profile-edit-section"
                onSubmit={handleUsernameSubmit}
            >
                <div className="profile-edit-section-header">
                    <h3 className="profile-edit-section-title">Username</h3>

                    <p className="profile-edit-section-description">
                        Choose the username displayed on your profile.
                    </p>
                </div>

                <div className="profile-form-group">
                    <label htmlFor="profile-username" className="form-label">
                        Username
                    </label>

                    <input
                        id="profile-username"
                        name="username"
                        type="text"
                        className="form-input"
                        value={username}
                        onChange={handleUsernameChange}
                        autoComplete="username"
                        disabled={isUpdatingUsername}
                    />
                </div>

                {usernameMessage && (
                    <p
                        className={`profile-form-message profile-form-message--${usernameMessageType}`}
                        role={
                            usernameMessageType === "error" ? "alert" : "status"
                        }
                    >
                        {usernameMessage}
                    </p>
                )}

                <button
                    type="submit"
                    className="btn"
                    disabled={isUpdatingUsername}
                >
                    {isUpdatingUsername ? "Saving..." : "Save Username"}
                </button>
            </form>

            <form
                className="profile-edit-section"
                onSubmit={handlePasswordSubmit}
            >
                <div className="profile-edit-section-header">
                    <h3 className="profile-edit-section-title">Password</h3>

                    <p className="profile-edit-section-description">
                        Enter your current password before choosing a new one.
                    </p>
                </div>

                <div className="profile-password-fields">
                    <div className="profile-form-group">
                        <label
                            htmlFor="current-password"
                            className="form-label"
                        >
                            Current Password
                        </label>

                        <input
                            id="current-password"
                            name="currentPassword"
                            type="password"
                            className="form-input"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            autoComplete="current-password"
                            disabled={isUpdatingPassword}
                        />
                    </div>

                    <div className="profile-form-group">
                        <label htmlFor="new-password" className="form-label">
                            New Password
                        </label>

                        <input
                            id="new-password"
                            name="newPassword"
                            type="password"
                            className="form-input"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="profile-form-group">
                        <label
                            htmlFor="confirm-password"
                            className="form-label"
                        >
                            Confirm New Password
                        </label>

                        <input
                            id="confirm-password"
                            name="confirmPassword"
                            type="password"
                            className="form-input"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            autoComplete="new-password"
                        />
                    </div>
                </div>

                {passwordMessage && (
                    <p
                        className={`profile-form-message profile-form-message--${passwordMessageType}`}
                        role={
                            passwordMessageType === "error" ? "alert" : "status"
                        }
                    >
                        {passwordMessage}
                    </p>
                )}

                <button
                    type="submit"
                    className="btn"
                    disabled={isUpdatingPassword}
                >
                    {isUpdatingPassword ? "Updating..." : "Update Password"}
                </button>
            </form>

            <form
                className="profile-edit-section"
                onSubmit={handleAvatarSubmit}
            >
                <div className="profile-edit-section-header">
                    <h3 className="profile-edit-section-title">Avatar</h3>

                    <p className="profile-edit-section-description">
                        Upload an image to use as your profile avatar.
                    </p>
                </div>

                <div className="profile-avatar-editor">
                    <div className="profile-avatar-preview">
                        {avatarPreview ? (
                            <img
                                src={avatarPreview}
                                alt="Selected avatar preview"
                                className="profile-avatar-preview-image"
                            />
                        ) : (
                            <span
                                className="profile-avatar-preview-initial"
                                aria-hidden="true"
                            >
                                {userInitial}
                            </span>
                        )}
                    </div>

                    <div className="profile-avatar-controls">
                        <label htmlFor="avatar-file" className="form-label">
                            Choose an image
                        </label>

                        <input
                            id="avatar-file"
                            name="avatar"
                            type="file"
                            accept="image/*"
                            className="profile-file-input"
                            onChange={handleAvatarChange}
                        />

                        {avatarFile && (
                            <p className="profile-selected-file">
                                Selected: {avatarFile.name}
                            </p>
                        )}
                    </div>
                </div>

                {avatarMessage && (
                    <p className="profile-form-message" role="status">
                        {avatarMessage}
                    </p>
                )}

                <button type="submit" className="btn">
                    Upload Avatar
                </button>
            </form>
        </section>
    );
}

export default ProfileEditForm;
