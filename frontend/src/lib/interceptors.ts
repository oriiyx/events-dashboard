// src/apiService.ts
import axios from 'axios';
import { getToken, logout } from './auth';
import { BACKEND_INTERNAL_URL } from '@/lib/env.ts';

// Create an instance of axios with the base URL
const api = axios.create({
  baseURL: BACKEND_INTERNAL_URL,
});

// Add a request interceptor to include the JWT token in headers
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor to handle unauthorized errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default api;
