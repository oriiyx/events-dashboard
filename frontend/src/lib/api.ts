import api from './interceptors'; // Import the configured axios instance
import {Event, eventSchema} from '../schema/event-schema';
import * as z from 'zod'; // Ensure Zod is imported

export async function apiFetchEvents(page: number = 1): Promise<Event[]> {
    try {
        const response = await api.get(`/events?page=${page}`); // Use `api` instead of `axios`
        return z.array(eventSchema).parse(response.data);
    } catch (error) {
        console.error('Failed to fetch events:', error);
        throw new Error('Failed to fetch events');
    }
}