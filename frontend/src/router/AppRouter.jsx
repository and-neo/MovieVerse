import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import MainLayout from "../layouts/MainLayout/MainLayout";

import Home from "../pages/Home/Home";
import Library from "../pages/Library/Library";
import Login from "../pages/Login/Login";
import MovieDetails from "../pages/MovieDetails/MovieDetails";
import Movies from "../pages/Movies/Movies";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";
import SearchResults from "../pages/SearchResults/SearchResults";
import TVShowDetails from "../pages/TVShowDetails/TVShowDetails";
import TVShows from "../pages/TVShows/TVShows";

/**
 * Main application router.
 *
 * Handles navigation between all application pages.
 */

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
                    <Route path="/search" element={<SearchResults />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/library" element={<Library />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
