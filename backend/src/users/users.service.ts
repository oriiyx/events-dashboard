import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma.service';
import {Prisma, User} from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {
    }

    async user(
        userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    }

    async users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]> {
        const {skip, take, cursor, where, orderBy} = params;
        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (user !== null) {
            throw new BadRequestException('User already exists');
        }

        const password = await bcrypt.hash(data.password, 10);

        const userInput = {
            email: data.email,
            name: data.name,
            password: password,
            Event: data.Event
        } as Prisma.UserCreateInput;

        return this.prisma.user.create({
            data: userInput,
        });
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const {where, data} = params;
        return this.prisma.user.update({
            data,
            where,
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        });
    }
}