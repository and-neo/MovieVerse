import "./Register.css";

import AuthForm from "../../components/authForm/AuthForm";

/**
 * Displays the registration page.
 */

function Register() {
    return (
        <main>
            <AuthForm mode="register" />
        </main>
    );
}

export default Register;
