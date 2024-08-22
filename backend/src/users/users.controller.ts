import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import { User as UserModel, Post as PostModel } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post('user')
    async signupUser(
        @Body() userData: { name?: string; email: string },
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
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser({ where: { id: Number(id) }, data: updateUserDto });
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.deleteUser({ id: Number(id) });
    }
}
