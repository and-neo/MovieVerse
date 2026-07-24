import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import AuthProvider from "./context/AuthContext";
import LibraryProvider from "./context/LibraryProvider";

import "./styles/global.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <LibraryProvider>
                <App />
            </LibraryProvider>
        </AuthProvider>
    </StrictMode>,
);
