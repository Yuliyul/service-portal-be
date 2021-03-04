import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KassesModule } from './kasses/kasses.module';
@Module({
  imports: [
    KassesModule,
    MongooseModule.forRoot(
      `mongodb+srv://yuliya:kRZJB9MfbkvGtjv@cluster0.odwjp.mongodb.net/localmachines`,
      {
        useCreateIndex: true,
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
