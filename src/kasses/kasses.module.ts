import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KassesController } from './kasses.controller';
import { KassesService } from './kasses.service';
import { Kasse, KasseSchema } from './schemas/kasse.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Kasse.name, schema: KasseSchema }]),
    HttpModule,
  ],

  providers: [KassesService],
  controllers: [KassesController],
})
export class KassesModule {}
