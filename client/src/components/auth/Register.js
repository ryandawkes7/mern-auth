import React, { useState } from "react";

export default function Register() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();

    return(
        <div className="page">
            <h2>Register</h2>
            <form>
                {/* Email */}
                <label htmlFor="register-email">Email</label>
                <input
                    type="email"
                    id="register-email"
                    placeholder="Enter your email..."
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Password */}
                <label htmlFor="register-password">Password</label>
                <input
                    type="password"
                    id="register-password"
                    placeholder="Enter your password..."
                />
                <input
                    type="password"
                    id="register-password"
                    placeholder="Retype your password..."
                />

                {/* Display Name */}
                <label htmlFor="register-name">Display Name</label>
                <input
                    type="text"
                    id="register-name"
                    placeholder="Enter display name..."
                />

                {/* Submit Button */}
                <input type="submit" value="Register"
                />
            </form>
        </div>
    )
}
