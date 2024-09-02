import api from './interceptors'; // Import the configured axios instance
import {CreateEvent, Event, eventSchema, EventType, eventTypeSchema} from '../schema/event-schema';
import * as z from 'zod';
import {getAllowAds} from "@/lib/auth.ts";
import {handleAxiosError} from "@/lib/error-handler.ts"; // Ensure Zod is imported

export async function apiFetchEvents(page: number = 1): Promise<Event[]> {
    try {
        const response = await api.get(`/events?page=${page}`); // Use `api` instead of `axios`
        return z.array(eventSchema).parse(response.data);
    } catch (error) {
        handleAxiosError(error, 'Failed to fetch events');
        throw new Error('Failed to fetch events');
    }
}

export async function apiCreateEvent(event: CreateEvent): Promise<void> {
    console.log(event);
    try {
        const response = await api.post(`/events/create`, event); // Use `api` instead of `axios`
        console.log(response);
        if (response.status !== 201) {
            throw new Error('Failed to create event');
        }
    } catch (error) {
        handleAxiosError(error, 'Failed to create event');
        throw new Error('Failed to fetch events');
    }
}

export async function apiUpdateEvent(id: number, event: Event): Promise<void> {
    try {
        const response = await api.patch(`/events/${id}`, event); // Use `api` instead of `axios`
        if (response.status !== 200) {
            throw new Error('Failed to update event');
        }
    } catch (error) {
        handleAxiosError(error, 'Failed to update event');
        throw new Error('Failed to update events');
    }
}

export async function apiFetchEvent(id: number): Promise<Event> {
    try {
        const response = await api.get(`/events/${id}`); // Use `api` instead of `axios`
        return eventSchema.parse(response.data);
    } catch (error) {
        handleAxiosError(error, 'Failed to fetch event');
        throw new Error('Failed to fetch event');
    }
}

export async function apiFetchEventTypes(editingEvent: boolean = false): Promise<EventType[]> {
    try {
        const response = await api.get(`/events/types`); // Use `api` instead of `axios`
        const data = z.array(eventTypeSchema).parse(response.data);
        if (editingEvent) {
            const isUserAllowedToSeeAds = getAllowAds();
            if (isUserAllowedToSeeAds === "false") {
                return data.filter(eventType => eventType.name !== 'ADS');
            }
        }
        return data;
    } catch (error) {
        handleAxiosError(error, 'Failed to fetch event types');
        throw new Error('Failed to fetch event types');
    }
}
