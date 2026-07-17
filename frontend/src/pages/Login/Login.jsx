import "./Login.css";

import AuthForm from "../../components/authForm/AuthForm";

/**
 * Displays the login page.
 */

function Login() {
    return (
        <main>
            <AuthForm mode="login" />
        </main>
    );
}

export default Login;
