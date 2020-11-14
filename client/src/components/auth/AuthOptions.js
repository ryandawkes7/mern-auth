import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from "../../context/UserContext";

export default function AuthOptions() {
    const { userData, setUserData } = useContext(UserContext);

    const history = useHistory();

    // Set current URL to /register
    const register = () => history.push("/register")
    // Set current URL to /login
    const login = () => history.push("/login")

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
    };

    return(
        <nav className="auth-options">
            { userData.user ? (
                <button onClick={logout}>Log out</button>
            ) : (
                <>
                    <button onClick={register}>Register</button>
                    <button onClick={login}>Login</button>
                </>
            )}
        </nav>
    )
}
