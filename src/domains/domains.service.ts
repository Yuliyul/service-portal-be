import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Domain, DomainDocument } from './schemas/domain.schema';
import { Model } from 'mongoose';
import { CreateDomainDto } from './dto/create-domain.dto';
@Injectable()
export class DomainsService {
  constructor(
    @InjectModel(Domain.name)
    private DomainModel: Model<Domain>,
  ) {}

  async getAll(cond?: any): Promise<Domain[]> {
    if (cond && typeof cond._end != 'undefined') {
      let limit = <number>(cond._end - cond._start);
      let skip_qnt = <number>(cond._start - 0);
      let order = <number>(cond._order == 'ASC' ? 1 : -1);
      let sort_field = <string>cond._sort;
      var sort_cond = {};
      sort_cond[sort_field] = order;
      let filter: any = {};
      if (cond.domainID) filter.domainID = cond.domainID;

      return this.DomainModel.find(filter)
        .limit(limit)
        .skip(<number>skip_qnt)
        .sort(sort_cond)
        .exec();
    } else if (cond && typeof cond.id != 'undefined') {
      var ids = cond.id;
      var filter = { domainID: { $in: ids } };
      return this.DomainModel.find(filter);
    } else return this.DomainModel.find().exec();
  }

  async create(DomainDto: CreateDomainDto) {
    const newDomain = new this.DomainModel(DomainDto);
    const filter = { domainID: newDomain.domainID };
    let isExist = await this.DomainModel.findOne(filter);
    if (isExist) {
      let toUpdate = Object.assign(isExist, newDomain, { _id: isExist._id });
      return await this.DomainModel.findByIdAndUpdate(isExist._id, toUpdate);
    }
    return newDomain.save();
  }

  async total(cond?: any): Promise<number> {
    let filter: any = {};
    if (cond && cond.domainID) filter.domainID = cond.domainID;
    return await this.DomainModel.countDocuments(filter);
  }

  async getIds(cond?: string): Promise<string[]> {
    var filter: any = {};
    if (cond) filter.domainName = { $regex: '.*' + cond + '.*' };
    var dataset = await this.DomainModel.find(filter).select('domainID -_id');
    var ids_arr = [];
    dataset.forEach((el) => {
      ids_arr.push(el.domainID);
    });
    return ids_arr;
  }
  async getNew(): Promise<void | number> {
    let monthAgo = new Date();
    monthAgo.setDate(monthAgo.getMonth() - 1);
    return this.DomainModel.find({
      createdAt: { $gte: monthAgo },
    }).countDocuments();
  }
}
