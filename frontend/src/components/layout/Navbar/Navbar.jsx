import { NavLink, Link } from "react-router-dom";
import { navigation } from "../../../constants/navigation";

import "./Navbar.css";

/**
 * Main navigation bar displayed across the application.
 * Provides quick access to the primary pages.
 */

function Navbar() {
    return (
        <header className="navbar">
            <div className="container navbar-container">
                {/* Logo */}
                <div className="navbar-logo">
                    <Link to="/">🎬 MovieVerse</Link>
                </div>

                {/* Main Navigation */}
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

                {/* Authentication */}
                <div className="navbar-auth">
                    <NavLink to="/login" className="nav-link">
                        Login
                    </NavLink>

                    <NavLink to="/register" className="nav-link">
                        Register
                    </NavLink>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
