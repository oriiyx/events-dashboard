import {Test, TestingModule} from '@nestjs/testing';
import {EventsController} from './events.controller';
import {EventsService} from './events.service';
import {AuthController} from '../auth/auth.controller';
import {AuthService} from '../auth/auth.service';
import {PrismaService} from '../prisma.service';
import {JwtModule} from '@nestjs/jwt';
import {UsersService} from '../users/users.service';
import {ConfigService} from '@nestjs/config';
import {HttpModule} from '@nestjs/axios'; // Import HttpService
import * as request from 'supertest';
import {INestApplication} from '@nestjs/common';
import {jwtConstants} from "../auth/constants";

describe('EventsController', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController, EventsController],
            providers: [
                AuthService,
                EventsService,
                PrismaService,
                UsersService,
                ConfigService,
            ],
            imports: [HttpModule, JwtModule.register({
                global: true,
                secret: jwtConstants.secret,
                signOptions: {expiresIn: '6000s'},
            })],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should register, login, and create a new event', async () => {
        const email = `testuser_${Date.now()}@example.com`;
        const password = 'password123';
        const registerResponse = await request(app.getHttpServer())
            .post('/auth/register')
            .send({email, password});

        expect(registerResponse.status).toBe(200);

        const randomUSAIP = "101.36.115.1";

        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send({email: email, password: password, ip: randomUSAIP});

        expect(loginResponse.status).toBe(200);
        const token = loginResponse.body.token;
        const userId = loginResponse.body.id;
        expect(token).toBeDefined();
        expect(userId).toBeDefined();

        const webClickEvents = ['Triggered', 'Clicked', 'Visited', 'Opened', 'Engaged', 'Homepage Banner', 'Homepage Slider Stopped', 'Homepage Slider Clicked', 'Homepage Banner Clicked', 'Homepage Banner Engaged', 'Homepage Slider Engaged', 'Homepage Slider Opened', 'Homepage Banner Opened'];
        const descriptions = ['User clicked on the homepage banner', 'User visited the homepage', 'User engaged with the homepage banner', 'User clicked on the homepage slider', 'User opened the homepage', 'User engaged with the homepage', 'User stopped the homepage slider', 'User clicked on the homepage slider', 'User clicked on the homepage banner', 'User engaged with the homepage banner', 'User opened the homepage slider', 'User engaged with the homepage slider', 'User opened the homepage banner'];

        for (let i = 0; i < webClickEvents.length; i++) {
            const priority = Math.floor(Math.random() * 11);
            const eventType = Math.floor(Math.random() * 4) + 1;


            const eventData = {
                name: webClickEvents[i],
                description: descriptions[i],
                priority: priority,
                typeId: eventType,
                published: true,
                userId: userId
            };

            const createEventResponse = await request(app.getHttpServer())
                .post('/events/create')
                .set('Authorization', `Bearer ${token}`)
                .send(eventData);

            expect(createEventResponse.status).toBe(201);
        }
    });
});
