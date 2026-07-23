/**
 * Main application router.
 *
 * Handles navigation between all application pages.
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout/MainLayout";

import Home from "../pages/Home/Home";
import Movies from "../pages/Movies/Movies";
import TVShows from "../pages/TVShows/TVShows";
import MovieDetails from "../pages/MovieDetails/MovieDetails";
import TVShowDetails from "../pages/TVShowDetails/TVShowDetails";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import SearchResults from "../pages/SearchResults/SearchResults";
import ProtectedRoute from "../components/auth/ProtectedRoute";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/tvshows" element={<TVShows />} />
                    <Route path="/movies/:id" element={<MovieDetails />} />
                    <Route path="/tvshows/:id" element={<TVShowDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route path="/search" element={<SearchResults />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
