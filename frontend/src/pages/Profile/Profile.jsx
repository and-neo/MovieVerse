import { useState, useRef, useEffect } from "react";

import ProfileHeader from "../../components/profile/ProfileHeader/ProfileHeader";
import ProfileStats from "../../components/profile/ProfileStats/ProfileStats";
import ProfileEditForm from "../../components/profile/ProfileEditForm/ProfileEditForm";
import AccountActions from "../../components/profile/AccountActions/AccountActions";

import "./Profile.css";

/**
 * Profile page of the application.
 */

const mockUser = {
    username: "Andreas",
    email: "andreas@example.com",
    avatarUrl: "",
    joinedAt: "2026-01-15",
    favoritesCount: 12,
    watchlistCount: 8,
};

function Profile() {
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

    return (
        <main className="profile-page">
            <ProfileHeader
                user={mockUser}
                onEdit={handleEditProfile}
                isEditing={isEditing}
            />

            <ProfileStats user={mockUser} />

            {isEditing && (
                <ProfileEditForm
                    user={mockUser}
                    onCancel={handleCancelEditing}
                    formRef={editFormRef}
                />
            )}
            <AccountActions />
        </main>
    );
}

export default Profile;
