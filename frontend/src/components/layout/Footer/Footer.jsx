/**
 * Footer component.
 *
 * Displays the footer of the application.
 */

import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <footer>
            <p>© 2026 MovieVerse</p>
            <Link className="about" to="/about">
                About
            </Link>
        </footer>
    );
}

export default Footer;
