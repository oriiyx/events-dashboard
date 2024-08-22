import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import { EventsModule } from './events/events.module';

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
    }), UsersModule, EventsModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
