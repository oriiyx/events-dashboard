import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:3000/auth';

const userKey = 'userId';
const allowAdsKey = 'allowAds';

export async function login(email: string, password: string) {
    const ip = await axios.get(
        'https://api.ipify.org?format=json',
    );
    if (!ip.data.ip) {
        console.log('No ip address found');
        return;
    }

    const response = await axios.post(`${API_BASE_URL}/login`, {
        email: email,
        password: password,
        ip: ip.data.ip
    });

    const {token, id, ads} = response.data;

    // Save the JWT token in a cookie
    Cookies.set('jwt', token, {expires: 7, path: '/'});

    // set user id in local storage
    localStorage.setItem(userKey, id);

    localStorage.setItem(allowAdsKey, ads);

    return token;
}

export async function register(email: string, password: string) {
    const response = await axios.post(`${API_BASE_URL}/register`, {
        email,
        password,
    });
    return response.data;
}

export function logout() {
    Cookies.remove('jwt');
    localStorage.removeItem(userKey);
}

export function getToken() {
    return Cookies.get('jwt');
}

export function getUserId() {
    return localStorage.getItem(userKey);
}

export function getAllowAds() {
    return localStorage.getItem(allowAdsKey);
}