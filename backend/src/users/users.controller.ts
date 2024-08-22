import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {UsersService} from './users.service';
import { User as UserModel } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post('user')
    async signupUser(
        @Body() userData: { name: string; email: string; password: string },
    ): Promise<UserModel> {
        return this.usersService.createUser(userData);
    }

    @Get()
    findAll() {
        return this.usersService.users({});
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<UserModel | null> {
        return this.usersService.user({ id: Number(id) });
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() userData: { name: string; email: string; password: string }) {
        return this.usersService.updateUser({ where: { id: Number(id) }, data: userData });
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.deleteUser({ id: Number(id) });
    }
}
