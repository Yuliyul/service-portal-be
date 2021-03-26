import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Import, ImportDocument } from './schemas/import.schema';
import { Model } from 'mongoose';
import { CreateImportDto } from './dto/create-import.dto';

@Injectable()
export class ImportsService {
  constructor(
    @InjectModel(Import.name)
    private ImportModel: Model<Import>,
  ) {}

  async create(ImportDto: CreateImportDto) {
    const filter = { action: ImportDto.action };
    return await this.ImportModel.findOneAndUpdate(filter, ImportDto, {
      upsert: true,
    }).catch((error) => {
      console.log(error);
    });
  }
  async getLast(ImportDto: CreateImportDto) {
    const filter = { action: ImportDto.action };
    return await this.ImportModel.findOne(filter);
  }
}
