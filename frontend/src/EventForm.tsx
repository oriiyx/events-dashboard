import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod'
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Checkbox} from "@/components/ui/checkbox"
import {useToast} from "@/components/ui/use-toast"
import Header from "@/components/header"
import {eventSchema, EventType} from "@/schema/event-schema"
import {apiCreateEvent, apiFetchEvent, apiFetchEventTypes, apiUpdateEvent} from "@/lib/api.ts";
import {handleAxiosError} from "@/lib/error-handler.ts";
import {getUserId} from "@/lib/auth.ts";

export default function EventForm() {
    const {id} = useParams<{ id: string }>()
    const navigate = useNavigate()
    const {toast} = useToast()
    const [eventTypes, setEventTypes] = useState<EventType[]>([])

    const form = useForm<z.infer<typeof eventSchema>>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            name: "",
            description: "",
            typeId: 0,
            priority: 1,
            published: false,
        },
    })

    useEffect(() => {
        fetchEventTypes().then();
    }, []);

    useEffect(() => {
        if (id) {
            fetchEventTypes().then(() => fetchEvent(parseInt(id)).then());
        }
    }, [id])

    const fetchEventTypes = async () => {
        try {
            const data = await apiFetchEventTypes(true)
            setEventTypes(data)
        } catch (error) {
            handleAxiosError(error, 'Failed to fetch event types')
            toast({title: "Error", description: "Failed to fetch event types", variant: "destructive"})
        }
    }

    const fetchEvent = async (eventId: number) => {
        try {
            const event = await apiFetchEvent(eventId)
            form.reset(event)
        } catch (error) {
            handleAxiosError(error, 'Failed to fetch event')
            toast({title: "Error", description: "Failed to fetch event", variant: "destructive"})
        }
    }

    const onSubmit = async (values: z.infer<typeof eventSchema>) => {
        try {
            const userId = getUserId();
            values.userId = Number(userId);

            if (id) {
                await apiUpdateEvent(parseInt(id), values)
                toast({title: "Event updated successfully"})
            } else {
                await apiCreateEvent(values)
                toast({title: "Event created successfully"})
            }
            navigate('/dashboard')
        } catch (error) {
            handleAxiosError(error, 'An error occurred while saving the event')
            toast({title: "Error", description: "An error occurred while saving the event", variant: "destructive"})
        }
    }

    return (
        <div className="min-h-screen bg-black text-green-500 p-4 font-mono">
            <div className="container mx-auto">
                <Header/>
                <div className="bg-green-500 w-full p-2 mb-5">
                    <h1 className="text-xl font-bold text-left text-black">{id ? 'Edit Event' : 'Create New Event'}</h1>
                </div>
                <div className="border-4 border-green-500 p-8 rounded-none shadow-lg shadow-green-500/50">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-green-500">Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} className="bg-green-900 text-white border-2 border-green-500"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-green-500">Description</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} className="bg-green-900 text-white border-2 border-green-500"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="typeId"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-green-500">Event Type</FormLabel>
                                        <Select onValueChange={(value) => field.onChange(parseInt(value))}
                                                value={field.value.toString()}>
                                            <FormControl>
                                                <SelectTrigger className="bg-green-900 text-white border-2 border-green-500">
                                                    <SelectValue placeholder="Select an event type"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-green-900 text-white border-2 border-green-500">
                                                {eventTypes.map((type) => (
                                                    <SelectItem key={type.id}
                                                                value={type.id.toString()}>{type.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="priority"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-green-500">Priority</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                className="bg-green-900 text-white border-2 border-green-500"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="published"
                                render={({field}) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className="bg-green-900 border-2 border-green-500"
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="text-green-500">
                                                Published
                                            </FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-between">
                                <Button
                                    type="button"
                                    onClick={() => navigate('/dashboard')}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-none"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-none"
                                >
                                    {id ? 'Update' : 'Create'} Event
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}