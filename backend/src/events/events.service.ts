import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Event, Prisma } from '@prisma/client';
import { CreateEventDto, PatchEventDto } from './dto/events.dto';
import { EventType } from '.prisma/client';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(private prisma: PrismaService) {}

  async event(
    eventWhereUniqueInput: Prisma.EventWhereUniqueInput,
  ): Promise<Event | null> {
    this.logger.log(`Finding event with ID: ${eventWhereUniqueInput.id}`);
    return this.prisma.event.findUnique({
      where: eventWhereUniqueInput,
    });
  }

  async events(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EventWhereUniqueInput;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput;
  }): Promise<Event[]> {
    const { skip, take, cursor, where, orderBy } = params;
    this.logger.log(`Finding events with params: ${JSON.stringify(params)}`);
    return this.prisma.event.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async eventTypes(): Promise<EventType[]> {
    this.logger.log('Finding all event types');
    return this.prisma.eventType.findMany();
  }

  async createEvent(data: CreateEventDto): Promise<Event> {
    this.logger.log(`Creating event: ${JSON.stringify(data)}`);
    const eventType = await this.prisma.eventType.findUnique({
      where: { id: data.typeId },
    });

    this.logger.log(`Event type: ${JSON.stringify(eventType)}`);

    if (!eventType) {
      this.logger.error('Invalid event type');
      throw new BadRequestException('Invalid event type');
    }

    let userUpdateData;
    if (data.userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: data.userId },
      });

      this.logger.log(`User: ${JSON.stringify(user)}`);

      if (!user) {
        this.logger.error('Invalid user ID');
        throw new BadRequestException('Invalid user ID');
      }

      userUpdateData = { connect: { id: user.id } };
    }

    const newEvent = {
      name: data.name,
      description: data.description,
      priority: data.priority,
      type: {
        connect: {
          id: eventType.id,
        },
      },
      user: userUpdateData,
      published: data.published,
      updatedAt: new Date(),
      createdAt: new Date(),
    } as Prisma.EventCreateInput;

    this.logger.log(`Creating event: ${JSON.stringify(newEvent)}`);

    return this.prisma.event.create({
      data: newEvent,
    });
  }

  async updateEvent(params: {
    where: Prisma.EventWhereUniqueInput;
    data: PatchEventDto;
  }): Promise<Event> {
    const { data, where } = params;
    this.logger.log(`Updating event: ${JSON.stringify(data)}`);
    // Check if the Event exists
    const existingEvent = await this.prisma.event.findUnique({
      where: { id: where.id },
    });

    if (!existingEvent) {
      this.logger.error('Event not found');
      throw new BadRequestException('Event not found');
    }

    const eventType = await this.prisma.eventType.findUnique({
      where: { id: data.typeId },
    });

    this.logger.log(`Event type: ${JSON.stringify(eventType)}`);

    if (!eventType) {
      this.logger.error('Invalid event type');
      throw new BadRequestException('Invalid event type');
    }

    let userUpdateData;
    if (data.userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: data.userId },
      });

      this.logger.log(`User: ${JSON.stringify(user)}`);

      if (!user) {
        this.logger.error('Invalid user ID');
        throw new BadRequestException('Invalid user ID');
      }

      userUpdateData = { connect: { id: user.id } };
    }

    const eventUpdateData = {
      name: data.name,
      description: data.description,
      priority: data.priority,
      type: {
        connect: {
          id: eventType.id,
        },
      },
      user: userUpdateData,
      published: data.published,
      updatedAt: new Date(),
    } as Prisma.EventCreateInput;

    this.logger.log(`Updating event: ${JSON.stringify(eventUpdateData)}`);

    return this.prisma.event.update({
      data: eventUpdateData,
      where: where,
    });
  }

  async deleteEvent(where: Prisma.EventWhereUniqueInput): Promise<Event> {
    this.logger.log(`Deleting event: ${JSON.stringify(where)}`);
    return this.prisma.event.delete({
      where,
    });
  }
}
