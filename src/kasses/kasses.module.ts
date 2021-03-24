import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainsModule } from './../domains/domains.module';
import { KassesController } from './kasses.controller';
import { KassesService } from './kasses.service';
import { Kasse, KasseSchema } from './schemas/kasse.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Kasse.name, schema: KasseSchema }]),
    HttpModule,
    DomainsModule,
  ],

  providers: [KassesService],
  controllers: [KassesController],
})
export class KassesModule {}
