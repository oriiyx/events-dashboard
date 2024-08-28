import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {User} from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {
    }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.userService.user({email: email});
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = {sub: user.id, email: user.email};

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(email: string, password: string, name: string): Promise<User> {
        return this.userService.createUser({email: email, password: password, name: name});
    }
}
