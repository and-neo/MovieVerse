import { useState } from "react";
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

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu() {
        setIsMenuOpen((current) => !current);
    }

    function closeMenu() {
        setIsMenuOpen(false);
    }

    function handleLogout() {
        logout();
        closeMenu();
        navigate("/", { replace: true });
    }

    return (
        <header className="navbar">
            <div className="container navbar-container">
                <div className="navbar-logo">
                    <Link to="/" onClick={closeMenu}>
                        <img
                            src="/mv-pop.png"
                            alt="MovieVerse"
                            className="navbar-logo-image"
                        />
                        <span>MovieVerse</span>
                    </Link>
                </div>

                <button
                    type="button"
                    className="navbar-toggle"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? "✕" : "☰"}
                </button>

                <div
                    className={`navbar-menu ${
                        isMenuOpen ? "navbar-menu-open" : ""
                    }`}
                >
                    <nav className="navbar-links">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}

                        {isAuthenticated && (
                            <NavLink
                                to="/library"
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                Library
                            </NavLink>
                        )}
                    </nav>

                    <div className="navbar-auth">
                        {isAuthenticated ? (
                            <>
                                <NavLink
                                    to="/profile"
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link active"
                                            : "nav-link"
                                    }
                                >
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
                                <NavLink
                                    to="/login"
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link active"
                                            : "nav-link"
                                    }
                                >
                                    Login
                                </NavLink>

                                <NavLink
                                    to="/register"
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link active"
                                            : "nav-link"
                                    }
                                >
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
