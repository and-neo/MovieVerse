/**
 * Navbar component.
 *
 * Displays the main navigation of the application.
 */

import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav>
            <div className="logo">
                <Link to="/">MovieVerse</Link>
            </div>

            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>

                <li>
                    <Link to="/movies">Movies</Link>
                </li>

                <li>
                    <Link to="/tvshows">TV Shows</Link>
                </li>

                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>

            <div className="auth-links">
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
}

export default Navbar;
