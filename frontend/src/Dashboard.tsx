import {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {useToast} from "@/components/ui/use-toast"
import {Event, EventType} from "@/schema/event-schema.ts";
import Header from "@/components/header.tsx";
import {apiFetchEvents, apiFetchEventTypes} from "@/lib/api.ts";
import {Link} from "react-router-dom";


export default function Dashboard() {
    const [events, setEvents] = useState<Event[]>([])
    const [eventTypes, setEventTypes] = useState<EventType[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const {toast} = useToast()

    useEffect(() => {
        fetchEvents().then();
        fetchEventTypes().then();
    }, [currentPage])

    const fetchEvents = async () => {
        // Replace this with your actual API call
        const data = await apiFetchEvents(currentPage);
        setEvents(data)
        setTotalPages(1)
    }

    const fetchEventTypes = async () => {
        const data = await apiFetchEventTypes();
        setEventTypes(data)
    }

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this event?")) {
            try {
                await fetch(`/api/events/${id}`, {method: 'DELETE'})
                toast({title: "Event deleted successfully"})
                fetchEvents().then();
            } catch (error) {
                toast({
                    title: "Error",
                    description: "An error occurred while deleting the event",
                    variant: "destructive"
                })
            }
        }
    }

    return (
        <div className="min-h-screen bg-black text-green-500 p-4 font-mono">
            <div className="container mx-auto">
                <Header/>
                <div className="bg-green-500 w-full p-2 mb-5">
                    <h1 className="text-xl font-bold text-left text-black">Dashboard</h1>
                </div>
                <div className="border-4 border-green-500 p-4 shadow-lg shadow-green-500/50">
                    <div className="flex justify-end p-2">
                        <Link
                            to="/events/new"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-none mb-4"
                        >
                            Create Event
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <Table className="w-full border-separate border-spacing-2">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="bg-green-600 text-white px-2 py-1">Name</TableHead>
                                    <TableHead className="bg-green-600 text-white px-2 py-1">Type</TableHead>
                                    <TableHead className="bg-green-600 text-white px-2 py-1">Priority</TableHead>
                                    <TableHead className="bg-green-600 text-white px-2 py-1">Published</TableHead>
                                    <TableHead className="bg-green-600 text-white px-2 py-1">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {events.map((event) => (
                                    <TableRow key={event.id} className="bg-black hover:bg-green-900">
                                        <TableCell className="border border-green-500 px-2 py-1">{event.name}</TableCell>
                                        <TableCell className="border border-green-500 px-2 py-1">{eventTypes.find(t => t.id === event.typeId)?.name}</TableCell>
                                        <TableCell className="border border-green-500 px-2 py-1">{event.priority}</TableCell>
                                        <TableCell className="border border-green-500 px-2 py-1">{event.published ? 'Yes' : 'No'}</TableCell>
                                        <TableCell className="border border-green-500 px-2 py-1">
                                            <Link
                                                to={`/events/${event.id}/edit`}
                                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-none border-2 border-white mr-2"
                                            >
                                                Edit
                                            </Link>
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

                    <div className="flex md:flex-row flex-col md:gap-0 gap-4 justify-between items-center mt-4 p-2">
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
                </div>
            </div>
        </div>
    )
}