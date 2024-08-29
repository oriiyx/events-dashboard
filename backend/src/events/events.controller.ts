import {Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe} from '@nestjs/common';
import {EventsService} from './events.service';
import {Event} from "@prisma/client";
import {CreateEventDto, PatchEventDto} from "./dto/events.dto";

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {
    }

    @Post('create')
    async createEvent(
        @Body() eventData: CreateEventDto,
    ): Promise<Event> {
        return this.eventsService.createEvent(eventData);
    }

    @Get()
    async findAll(): Promise<Event[]> {
        console.log('findAll');
        return this.eventsService.events({});
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Event | null> {
        console.log('id', id);
        return this.eventsService.event({ id: Number(id) });
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() eventData: PatchEventDto) {
        return this.eventsService.updateEvent({ where: { id: Number(id) }, data: eventData });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.eventsService.deleteEvent({ id: Number(id) });
    }
}
