import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImportsService } from './imports.service';
import { Import, ImportSchema } from './schemas/import.schema';

@Global()
@Module({
  providers: [ImportsService],
  imports: [
    MongooseModule.forFeature([{ name: Import.name, schema: ImportSchema }]),
  ],
  exports: [ImportsService],
})
export class ImportsModule {}
