import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import {LoggingInterceptor} from "../common/interceptor/logging.interceptor";

@Module({
    controllers: [CatsController],
    providers: [CatsService, LoggingInterceptor],
    exports: [CatsService]
})
export class CatsModule {}