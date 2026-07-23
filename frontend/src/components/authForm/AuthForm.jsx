import "./AuthForm.css";

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

/**
 * Displays a login or registration form.
 */

function AuthForm({ mode }) {
    const location = useLocation();

    const redirectPath = location.state?.from?.pathname || "/profile";

    const isRegister = mode === "register";

    const navigate = useNavigate();

    const { login, register } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        identifier: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setErrorMessage("");

        if (isRegister && formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        setIsSubmitting(true);

        try {
            if (isRegister) {
                await register({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                });
            } else {
                await login({
                    identifier: formData.identifier,
                    password: formData.password,
                });
            }

            navigate(redirectPath, { replace: true });
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
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
                        <label
                            className="form-label"
                            htmlFor={isRegister ? "email" : "identifier"}
                        >
                            {isRegister ? "Email" : "Email or Username"}
                        </label>

                        <input
                            className="form-input"
                            type={isRegister ? "email" : "text"}
                            id={isRegister ? "email" : "identifier"}
                            name={isRegister ? "email" : "identifier"}
                            value={
                                isRegister
                                    ? formData.email
                                    : formData.identifier
                            }
                            onChange={handleChange}
                            placeholder={
                                isRegister
                                    ? "Enter your email"
                                    : "Enter your email or username"
                            }
                            autoComplete={isRegister ? "email" : "username"}
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

                    <button
                        type="submit"
                        className="btn auth-submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? isRegister
                                ? "Creating account..."
                                : "Signing in..."
                            : isRegister
                              ? "Register"
                              : "Login"}
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
