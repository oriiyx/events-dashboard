import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {EventsService} from './events.service';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {
    }


}
