import { useEffect, useRef, useState } from "react";

import AccountActions from "../../components/profile/AccountActions/AccountActions";
import ProfileEditForm from "../../components/profile/ProfileEditForm/ProfileEditForm";
import ProfileHeader from "../../components/profile/ProfileHeader/ProfileHeader";
import ProfileStats from "../../components/profile/ProfileStats/ProfileStats";
import useAuth from "../../hooks/useAuth";

import "./Profile.css";

/**
 * Displays the authenticated user's profile.
 */

function Profile() {
    const { user } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const editFormRef = useRef(null);

    function handleEditProfile() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setIsEditing(false);
    }

    useEffect(() => {
        if (isEditing && editFormRef.current) {
            editFormRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [isEditing]);

    const profileUser = {
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl || "",
        joinedAt: user.createdAt,
        favoritesCount: user.favorites?.length || 0,
        watchlistCount: user.watchlist?.length || 0,
    };

    return (
        <main className="profile-page">
            <ProfileHeader
                user={profileUser}
                onEdit={handleEditProfile}
                isEditing={isEditing}
            />

            <ProfileStats user={profileUser} />

            {isEditing && (
                <ProfileEditForm
                    user={profileUser}
                    onCancel={handleCancelEditing}
                    formRef={editFormRef}
                />
            )}

            <AccountActions />
        </main>
    );
}

export default Profile;
