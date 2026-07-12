/**
 * Main layout of the application.
 *
 * Wraps all public pages with a common navigation bar and footer.
 */

import { Outlet } from "react-router-dom";

import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";

import "./MainLayout.css";

function MainLayout() {
    return (
        <div className="layout">
            <Navbar />

            <main className="main-content">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default MainLayout;
