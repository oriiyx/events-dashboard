import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {CatsModule} from "./cats/cats.module";
import {LoggerMiddleware} from "./common/middleware/logger.middleware";
import {CatsController} from "./cats/cats.controller";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {LoggingInterceptor} from "./common/interceptor/logging.interceptor";

@Module({
    imports: [CatsModule],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(CatsController);
    }
}
