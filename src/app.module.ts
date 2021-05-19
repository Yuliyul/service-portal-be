import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KassesModule } from './kasses/kasses.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core/constants';
import { ScheduleModule } from '@nestjs/schedule';
import { DomainsModule } from './domains/domains.module';
import { ImportsModule } from './imports/imports.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('mongodb'),
    }),
    KassesModule,
    AuthModule,
    UsersModule,
    ScheduleModule.forRoot(),
    DomainsModule,
    ImportsModule,
    WinstonModule.forRoot({
      transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        // new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({
          filename: 'app_output.log',
          maxFiles: 5,
          maxsize: 10000000,
        }),
      ],
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'MM-DD-YYYY HH:mm:ss',
        }),
        winston.format.printf(
          (info) => `${info.level}:  ${[info.timestamp]}: ${info.message}`,
        ),
        // winston.format.json(),
      ),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
