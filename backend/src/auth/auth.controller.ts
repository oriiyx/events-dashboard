import {Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {Public} from "./public";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(@Body() registerDto: Record<string, any>) {
        return this.authService.register(registerDto.email, registerDto.password, registerDto.name ? registerDto.name : '');
    }
}
