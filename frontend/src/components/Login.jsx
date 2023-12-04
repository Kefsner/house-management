import React from "react";
import { useState } from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            username,
            password
        };  // Short for { username: username, password: password }

        console.log(JSON.stringify(data));

        try {
            const response = await fetch("http://localhost:8000/auth/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
            console.log(responseData);
        }
        catch(err) {
            console.log('Error: ', err);
        }
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoFocus
            />
            
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                autoComplete="off"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />

            <button type="submit">Login</button>
        </form>
        </div>
    );
}

export default Login;