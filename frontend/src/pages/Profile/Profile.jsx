import { useEffect, useRef, useState } from "react";

import AccountActions from "../../components/profile/accountActions/AccountActions";
import ProfileEditForm from "../../components/profile/profileEditForm/ProfileEditForm";
import ProfileHeader from "../../components/profile/profileHeader/ProfileHeader";
import ProfileStats from "../../components/profile/profileStats/ProfileStats";

import useAuth from "../../hooks/useAuth";
import useFavorites from "../../hooks/useFavorites";
import useWatchlist from "../../hooks/useWatchlist";

import "./Profile.css";

/**
 * Displays the authenticated user's profile.
 */

function Profile() {
    const { user } = useAuth();

    const { favorites } = useFavorites();
    const { watchlist } = useWatchlist();

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
    };

    return (
        <main className="profile-page">
            <ProfileHeader
                user={profileUser}
                onEdit={handleEditProfile}
                isEditing={isEditing}
            />

            <ProfileStats
                favoritesCount={favorites.length}
                watchlistCount={watchlist.length}
            />

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
