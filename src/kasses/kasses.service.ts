import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { KasseDocument, Kasse } from './schemas/kasse.schema';
import { CreateKasseDto } from './dto/create-kasse.dto';
import { UpdateKasseDto } from './dto/update-kasse.dto';
import { from } from 'rxjs';
import { Model } from 'mongoose';
import { ByIdDto } from './dto/by-id.dto';
@Injectable()
export class KassesService {
  constructor(
    @InjectModel(Kasse.name)
    private KasseModel: Model<Kasse>,
  ) {}
  async getAll(): Promise<Kasse[]> {
    return this.KasseModel.find().exec();
  }
  async getOne(id: string): Promise<KasseDocument> {
    return this.KasseModel.findById(id);
  }
  async add(KasseDto: UpdateKasseDto) {
    const newKasse = new this.KasseModel(KasseDto);
    const filter = { domainID: newKasse.domainID, kasse: newKasse.kasse };
    let isExist = await this.KasseModel.findOne(filter);
    if (isExist) {
      let toUpdate = Object.assign(isExist, newKasse, { _id: isExist._id });
      return await this.KasseModel.findByIdAndUpdate(isExist._id, toUpdate);
      // return toUpdate.save();
    }
    return newKasse.save();
  }
  async restart(KasseId: ByIdDto): Promise<string> {
    const PC = await this.KasseModel.findById(KasseId);
    if (typeof PC.externalUrl != 'undefined')
      return PC.externalUrl + '/restart';
  }
}
