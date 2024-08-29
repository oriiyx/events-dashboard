// src/apiService.ts
import config from './config';

export async function apiEvents(page: number = 1) {
    const response = await fetch(`${config.apiBaseUrl}/events?page=${page}`);
    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }
    return response.json();
}

export async function apiEventTypes() {
    const response = await fetch(`${config.apiBaseUrl}/event-types`);
    if (!response.ok) {
        throw new Error('Failed to fetch event types');
    }
    return response.json();
}

// Add other API calls here as needed
