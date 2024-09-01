import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Event, Prisma } from '@prisma/client';
import { CreateEventDto, PatchEventDto } from './dto/events.dto';
import { EventType } from '.prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async event(
    eventWhereUniqueInput: Prisma.EventWhereUniqueInput,
  ): Promise<Event | null> {
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
    return this.prisma.event.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async eventTypes(): Promise<EventType[]> {
    return this.prisma.eventType.findMany();
  }

  async createEvent(data: CreateEventDto): Promise<Event> {
    const eventType = await this.prisma.eventType.findUnique({
      where: { name: data.type },
    });

    if (!eventType) {
      throw new BadRequestException('Invalid event type');
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
      user: {
        connect: { id: data.userId },
      },
      published: data.published,
      updatedAt: new Date(),
      createdAt: new Date(),
    } as Prisma.EventCreateInput;

    return this.prisma.event.create({
      data: newEvent,
    });
  }

  async updateEvent(params: {
    where: Prisma.EventWhereUniqueInput;
    data: PatchEventDto;
  }): Promise<Event> {
    const { data, where } = params;
    const eventType = await this.prisma.eventType.findUnique({
      where: { name: data.type },
    });

    if (!eventType) {
      throw new BadRequestException('Invalid event type');
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
      user: {
        connect: { id: data.userId },
      },
      published: data.published,
      updatedAt: new Date(),
    } as Prisma.EventCreateInput;

    return this.prisma.event.update({
      data: eventUpdateData,
      where: where,
    });
  }

  async deleteEvent(where: Prisma.EventWhereUniqueInput): Promise<Event> {
    return this.prisma.event.delete({
      where,
    });
  }
}
