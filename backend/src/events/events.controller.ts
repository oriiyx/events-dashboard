import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from '@prisma/client';
import { CreateEventDto, PatchEventDto } from './dto/events.dto';
import { EventType } from '.prisma/client';

@Controller('events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(private readonly eventsService: EventsService) {}

  @Post('create')
  async createEvent(@Body() eventData: CreateEventDto): Promise<Event> {
    this.logger.log(`Creating event: ${JSON.stringify(eventData)}`);
    return this.eventsService.createEvent(eventData);
  }

  @Get()
  async findAll(): Promise<Event[]> {
    this.logger.log('findAll');
    return this.eventsService.events({});
  }

  @Get('types')
  async findAllTypes(): Promise<EventType[]> {
    this.logger.log('findAllTypes');
    return this.eventsService.eventTypes();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Event | null> {
    this.logger.log(`findOne: ${id}`);
    return this.eventsService.event({ id: Number(id) });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() eventData: PatchEventDto) {
    this.logger.log(`Updating event: ${id} with ${JSON.stringify(eventData)}`);
    return this.eventsService.updateEvent({
      where: { id: Number(id) },
      data: eventData,
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.logger.log(`Deleting event: ${id}`);
    return this.eventsService.deleteEvent({ id: Number(id) });
  }
}
