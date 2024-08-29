// src/schemas/eventSchema.ts
import { z } from 'zod';
import axios from 'axios';
import config from '../config';
import axiom from '@axiomhq/axiom-node';

// Initialize Axiom client (adjust with your Axiom API key/configuration)
const client = axiom.createClient({
    token: process.env.AXIOM_TOKEN,
    orgId: process.env.AXIOM_ORG_ID,
});

export const eventSchema = z.object({
    id: z.number().optional(), // ID might be optional for new events
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    typeId: z.number().min(1, "Event type is required"),
    priority: z.number().min(1, "Priority is required"),
    published: z.boolean(),
    userId: z.number().nullable(), // UserID can be null
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

// Infer the TypeScript type from the schema
export type Event = z.infer<typeof eventSchema>;

// Use Axiom for logging and observability
export async function logEvent(event: Event) {
    try {
        await client.ingest({
            dataset: 'events',
            events: [event],
        });
    } catch (error) {
        console.error('Failed to log event:', error);
    }
}
