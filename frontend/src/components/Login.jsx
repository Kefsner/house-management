import React from "react";
import { useState } from "react";

import "./Login.css";
import { getCsrfToken } from "../utils/utils";

const apiURL = process.env.REACT_APP_API_URL;

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            username,
            password
        };
        
        const csrfToken = getCsrfToken();
        
        try {
            const response = await fetch(`${apiURL}auth/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
            console.log(responseData);
            if (response.ok) {
                window.location.href = "/";
            }
            else {
                alert(responseData);
            }
        }
        catch(err) {
            console.log('Error: ', err);
        }
    };

    return (
        <div className="bg-image">
            <div className="login-container">
                <div className="login-form-container">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Usuário</label>
                        <input
                            type="text"
                            id="username"
                            autoComplete="username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            autoFocus
                            />
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="off"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            />
                        <button type="submit">Entrar</button>
                        <button type="button" className="register-button" onClick={() => window.location.href = "/register"}>Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;