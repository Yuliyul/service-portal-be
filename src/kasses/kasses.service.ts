import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { KasseDocument, Kasse } from './schemas/kasse.schema';
import { CreateKasseDto } from './dto/create-kasse.dto';
import { from } from 'rxjs';
import { Model } from 'mongoose';
@Injectable()
export class KassesService {
  constructor(
    @InjectModel(Kasse.name)
    private KasseModel: Model<Kasse>,
  ) {}
  // private kasses = [1, 2, 3];
  async getAll(): Promise<Kasse[]> {
    return this.KasseModel.find().exec();
  }
  async getOne(id: string): Promise<KasseDocument> {
    return this.KasseModel.findById(id);
  }
  async add(KasseDto: CreateKasseDto) {
    const newKasse = new this.KasseModel(KasseDto);
    const filter = { domainID: newKasse.domainID, kasse: newKasse.kasse };
    // newKasse.save();
    let result = this.KasseModel.findOneAndUpdate(filter, newKasse, {
      new: true,
      upsert: true,
    });
    console.log(result);
    return result;
  }
}
