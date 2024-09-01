import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private allowAds: boolean;
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(email: string, pass: string, ip: string): Promise<any> {
    this.logger.log(`Sign in attempt for ${email} from ${ip}`);
    const user = await this.userService.user({ email: email });

    if (!user) {
      this.logger.error(`User ${email} not found`);
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };

    try {
      const countryCode = await this.httpService.axiosRef.get(
        `http://ip-api.com/json/${ip}`,
      );
      this.logger.log(
        `Country code for ${ip} is ${countryCode.data.countryCode}`,
      );
      if (!countryCode.data.countryCode) {
        throw new Error('No country code found for IP: ' + ip);
      }
      const roleUsername = this.configService.get<string>('ROLE_AUTH_USERNAME');
      const rolePassword = this.configService.get<string>('ROLE_AUTH_PASSWORD');
      const basicAuth = btoa(`${roleUsername}:${rolePassword}`);

      const headers = {
        'x-requested-with': 'XMLHttpRequest',
        Authorization: `Basic ${basicAuth}`,
      };

      const roleDefinerService = `https://us-central1-o7tools.cloudfunctions.net/fun7-ad-partner?countryCode=${countryCode.data.countryCode}`;

      const location = await this.httpService.axiosRef.get(
        `${roleDefinerService}`,
        {
          headers: headers,
        },
      );
      this.logger.log(`Role definer service response: ${location.data}`);
      // check if request failed
      this.allowAds = false;
      if (!location.data.error) {
        const allowAdsReturn = 'sure, why not';
        if (location.data.ads === allowAdsReturn) {
          this.allowAds = true;
        }
      }
    } catch (error) {
      this.logger.error(
        'Failed to get country code for IP: ' +
          ip +
          '. Setting default value false.',
      );
      this.logger.error(error);
      this.allowAds = false;
    }

    return {
      token: this.jwtService.sign(payload),
      id: user.id,
      ads: this.allowAds,
    };
  }

  async register(email: string, password: string, name: string): Promise<User> {
    this.logger.log(`Register attempt for ${email}`);
    return this.userService.createUser({
      email: email,
      password: password,
      name: name,
    });
  }
}
