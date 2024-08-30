import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:3000/auth';

export async function login(email: string, password: string) {
    const response = await axios.post(`${API_BASE_URL}/login`, {email, password});
    window.console.log(response.data)
    const {token} = response.data;

    // Save the JWT token in a cookie
    Cookies.set('jwt', token, {expires: 7, path: '/'});

    return token;
}

export async function register(email: string, password: string) {
    const response = await axios.post(`${API_BASE_URL}/register`, {email, password});
    return response.data;
}

export function logout() {
    Cookies.remove('jwt');
}

export function getToken() {
    return Cookies.get('jwt');
}
