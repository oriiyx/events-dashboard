// src/schemas/eventSchema.ts
import { z } from 'zod';

export const eventSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  typeId: z.number().min(1, 'Event type is required'),
  priority: z
    .number()
    .min(0, 'Priority is required')
    .max(10, 'Priority must be between 0 and 10'),
  published: z.boolean(),
  userId: z.number().min(1, 'User ID is required').nullable(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const createEventSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  typeId: z.number().min(1, 'Event type is required'),
  priority: z
    .number()
    .min(0, 'Priority is required')
    .max(10, 'Priority must be between 0 and 10'),
  published: z.boolean(),
  userId: z.number().min(1, 'User ID is required').nullable(),
});

// Infer the TypeScript type from the schema
export type Event = z.infer<typeof eventSchema>;
export type CreateEvent = z.infer<typeof createEventSchema>;

export const eventTypeSchema = z.object({
  id: z.number(), // ID might be optional for new events
  name: z.string().min(1, 'Name is required'),
});

// Infer the TypeScript type from the schema
export type EventType = z.infer<typeof eventTypeSchema>;
