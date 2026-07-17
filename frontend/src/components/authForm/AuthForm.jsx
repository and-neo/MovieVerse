import "./AuthForm.css";

import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Displays a login or registration form.
 */

function AuthForm({ mode }) {
    const isRegister = mode === "register";

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        setErrorMessage("");

        if (isRegister && formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        console.log({
            mode,
            formData,
        });
    }

    return (
        <section className="auth-section">
            <div className="container auth-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <header className="auth-header">
                        <h1 className="auth-title">
                            {isRegister ? "Create Account" : "Welcome Back"}
                        </h1>

                        <p className="auth-description">
                            {isRegister
                                ? "Create your MovieVerse account."
                                : "Sign in to continue to MovieVerse."}
                        </p>
                    </header>

                    {isRegister && (
                        <div className="form-group">
                            <label className="form-label" htmlFor="username">
                                Username
                            </label>

                            <input
                                className="form-input"
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                autoComplete="username"
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">
                            Email
                        </label>

                        <input
                            className="form-input"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">
                            Password
                        </label>

                        <input
                            className="form-input"
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            autoComplete={
                                isRegister ? "new-password" : "current-password"
                            }
                            required
                        />
                    </div>

                    {isRegister && (
                        <div className="form-group">
                            <label
                                className="form-label"
                                htmlFor="confirmPassword"
                            >
                                Confirm Password
                            </label>

                            <input
                                className="form-input"
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                autoComplete="new-password"
                                required
                            />
                        </div>
                    )}

                    {errorMessage && (
                        <p className="auth-error" role="alert">
                            {errorMessage}
                        </p>
                    )}

                    <button type="submit" className="btn auth-submit">
                        {isRegister ? "Register" : "Login"}
                    </button>

                    <p className="auth-switch">
                        {isRegister
                            ? "Already have an account?"
                            : "Don't have an account?"}

                        <Link
                            to={isRegister ? "/login" : "/register"}
                            className="auth-switch-link"
                        >
                            {isRegister ? "Login" : "Register"}
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
}

export default AuthForm;
