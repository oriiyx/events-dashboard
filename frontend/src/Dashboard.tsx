import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// Define the Event type
type Event = {
    id: number
    name: string
    description: string
    typeId: number
    priority: number
    published: boolean
    userId: number | null
    createdAt: string
    updatedAt: string
}

// Define the EventType type
type EventType = {
    id: number
    name: string
}

// Define the form schema
const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    typeId: z.number().min(1, "Event type is required"),
    priority: z.number().min(1, "Priority is required"),
    published: z.boolean(),
})

export default function Dashboard() {
    const [events, setEvents] = useState<Event[]>([])
    const [eventTypes, setEventTypes] = useState<EventType[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingEvent, setEditingEvent] = useState<Event | null>(null)
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            typeId: 0,
            priority: 1,
            published: false,
        },
    })

    useEffect(() => {
        fetchEvents()
        fetchEventTypes()
    }, [currentPage])

    const fetchEvents = async () => {
        // Replace this with your actual API call
        const response = await fetch(`http://localhost:3000/events?page=${currentPage}&limit=50`)
        const data = await response.json()
        setEvents(data.events)
        setTotalPages(data.totalPages)
    }

    const fetchEventTypes = async () => {
        // Replace this with your actual API call
        const response = await fetch('/api/event-types')
        const data = await response.json()
        setEventTypes(data)
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (editingEvent) {
                // Update existing event
                await fetch(`/api/events/${editingEvent.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                })
                toast({ title: "Event updated successfully" })
            } else {
                // Create new event
                await fetch('/api/events', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                })
                toast({ title: "Event created successfully" })
            }
            setIsDialogOpen(false)
            fetchEvents()
        } catch (error) {
            toast({ title: "Error", description: "An error occurred while saving the event", variant: "destructive" })
        }
    }

    const handleEdit = (event: Event) => {
        setEditingEvent(event)
        form.reset({
            name: event.name,
            description: event.description,
            typeId: event.typeId,
            priority: event.priority,
            published: event.published,
        })
        setIsDialogOpen(true)
    }

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this event?")) {
            try {
                await fetch(`/api/events/${id}`, { method: 'DELETE' })
                toast({ title: "Event deleted successfully" })
                fetchEvents()
            } catch (error) {
                toast({ title: "Error", description: "An error occurred while deleting the event", variant: "destructive" })
            }
        }
    }

    return (
        <div className="min-h-screen bg-black text-green-400 p-4 font-mono">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold mb-4 text-center animate-pulse">Event Arcade</h1>
                <div className="border-4 border-green-400 p-8 rounded-lg shadow-lg shadow-green-400/50">
                    <Button
                        onClick={() => { setEditingEvent(null); form.reset(); setIsDialogOpen(true); }}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-none border-2 border-white mb-4"
                    >
                        Insert Coin to Create Event
                    </Button>

                    <div className="overflow-x-auto">
                        <Table className="w-full border-separate border-spacing-2">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="bg-green-800 text-white px-2 py-1">Name</TableHead>
                                    <TableHead className="bg-green-800 text-white px-2 py-1">Type</TableHead>
                                    <TableHead className="bg-green-800 text-white px-2 py-1">Priority</TableHead>
                                    <TableHead className="bg-green-800 text-white px-2 py-1">Published</TableHead>
                                    <TableHead className="bg-green-800 text-white px-2 py-1">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {events.map((event) => (
                                    <TableRow key={event.id} className="bg-black hover:bg-green-900">
                                        <TableCell className="border border-green-400 px-2 py-1">{event.name}</TableCell>
                                        <TableCell className="border border-green-400 px-2 py-1">{eventTypes.find(t => t.id === event.typeId)?.name}</TableCell>
                                        <TableCell className="border border-green-400 px-2 py-1">{event.priority}</TableCell>
                                        <TableCell className="border border-green-400 px-2 py-1">{event.published ? 'Yes' : 'No'}</TableCell>
                                        <TableCell className="border border-green-400 px-2 py-1">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleEdit(event)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-none border-2 border-white mr-2"
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(event.id)}
                                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-none border-2 border-white"
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <Button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded-none border-2 border-white"
                        >
                            Previous Page
                        </Button>
                        <span className="text-xl">Page {currentPage} of {totalPages}</span>
                        <Button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded-none border-2 border-white"
                        >
                            Next Page
                        </Button>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogContent className="bg-black border-4 border-green-400 text-green-400">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-center">{editingEvent ? 'Edit Event' : 'Create New Event'}</DialogTitle>
                            </DialogHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="bg-green-900 text-white border-2 border-green-400" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea {...field} className="bg-green-900 text-white border-2 border-green-400" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="typeId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Event Type</FormLabel>
                                                <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value.toString()}>
                                                    <FormControl>
                                                        <SelectTrigger className="bg-green-900 text-white border-2 border-green-400">
                                                            <SelectValue placeholder="Select an event type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-green-900 text-white border-2 border-green-400">
                                                        {eventTypes.map((type) => (
                                                            <SelectItem key={type.id} value={type.id.toString()}>{type.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="priority"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Priority</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} className="bg-green-900 text-white border-2 border-green-400" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="published"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        className="bg-green-900 border-2 border-green-400"
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>
                                                        Published
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-none border-2 border-white">
                                        Save High Score
                                    </Button>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}