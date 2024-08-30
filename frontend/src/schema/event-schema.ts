// src/schemas/eventSchema.ts
import {z} from 'zod';

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
    console.log("Event logged", event);
}
