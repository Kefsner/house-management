import { jwtDecode } from "jwt-decode";

export function getCsrfToken() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === 'csrftoken') {
            return value;
        }
    }
    return '';
}


export function isAuthenticated() {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        return false;
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
    }
    catch (err) {
        console.log(err);
        localStorage.removeItem('accessToken');
        return false;
    }
}