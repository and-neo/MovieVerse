import "./ProfileHeader.css";

/**
 * Displays the user's main profile information.
 */

function ProfileHeader({ user, onEdit, isEditing }) {
    const userInitial = user.username.charAt(0).toUpperCase();

    const joinedYear = new Date(user.joinedAt).getFullYear();

    return (
        <section className="profile-card profile-header">
            <div className="profile-header-content">
                <div className="profile-avatar">
                    {user.avatarUrl ? (
                        <img
                            src={user.avatarUrl}
                            alt={`${user.username}'s avatar`}
                            className="profile-avatar-image"
                        />
                    ) : (
                        <span
                            className="profile-avatar-initial"
                            aria-hidden="true"
                        >
                            {userInitial}
                        </span>
                    )}
                </div>

                <div className="profile-identity">
                    <h1 className="profile-username">{user.username}</h1>

                    <p className="profile-email">{user.email}</p>

                    <p className="profile-joined">Member since {joinedYear}</p>
                </div>
            </div>

            <button
                type="button"
                className="btn profile-edit-button"
                onClick={onEdit}
                disabled={isEditing}
            >
                {isEditing ? "Editing Profile" : "Edit Profile"}
            </button>
        </section>
    );
}

export default ProfileHeader;
