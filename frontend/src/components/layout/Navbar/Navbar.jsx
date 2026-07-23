import { Link, NavLink, useNavigate } from "react-router-dom";

import { navigation } from "../../../constants/navigation";
import useAuth from "../../../hooks/useAuth";

import "./Navbar.css";

/**
 * Main navigation bar displayed across the application.
 * Provides access to primary pages and authentication actions.
 */

function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/", { replace: true });
    }

    return (
        <header className="navbar">
            <div className="container navbar-container">
                <div className="navbar-logo">
                    <Link to="/">🎬 MovieVerse</Link>
                </div>

                <nav className="navbar-links">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="navbar-auth">
                    {isAuthenticated ? (
                        <>
                            <NavLink to="/profile" className="nav-link">
                                {user.username}
                            </NavLink>

                            <button
                                type="button"
                                className="navbar-logout"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className="nav-link">
                                Login
                            </NavLink>

                            <NavLink to="/register" className="nav-link">
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;
