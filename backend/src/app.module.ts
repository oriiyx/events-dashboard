import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
    }), UsersModule, EventsModule, AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
