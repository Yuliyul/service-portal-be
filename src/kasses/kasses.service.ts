import { Injectable, HttpService, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { KasseDocument, Kasse, Timeout } from './schemas/kasse.schema';
import { CreateKasseDto } from './dto/create-kasse.dto';
import { UpdateKasseDto } from './dto/update-kasse.dto';
import { from } from 'rxjs';
import { Model } from 'mongoose';
const qs = require('querystring');
import { ByIdDto } from './dto/by-id.dto';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { DomainsService } from './../domains/domains.service';
import { ImportsService } from './../imports/imports.service';

@Injectable()
export class KassesService {
  constructor(
    @InjectModel(Kasse.name)
    private KasseModel: Model<Kasse>,
    private readonly httpService: HttpService,
    private config: ConfigService,
    private DomainsService: DomainsService,
    private ImportService: ImportsService,
  ) {}
  async generateFilter(cond?: any): Promise<any> {
    let filter: any = {};
    if (cond.domainID) filter.domainID = cond.domainID;
    if (cond.tseOn) filter.tseOn = cond.tseOn;
    if (cond.q) {
      const ids = await this.DomainsService.getIds(cond.q);
      filter.domainID = { $in: ids };
    }
    return filter;
  }
  async getAll(cond?: any): Promise<Kasse[]> {
    if (cond && typeof cond._end != 'undefined') {
      let limit = <number>(cond._end - cond._start);
      let skip_qnt = <number>(cond._start - 0);
      let order = <number>(cond._order == 'ASC' ? 1 : -1);
      let sort_field = <string>cond._sort;
      var sort_cond = {};
      sort_cond[sort_field] = order;
      var filter = await this.generateFilter(cond);
      return this.KasseModel.find(filter)
        .limit(limit)
        .skip(<number>skip_qnt)
        .sort(sort_cond)
        .exec();
    } else return this.KasseModel.find().exec();
  }

  async getOne(id: string): Promise<KasseDocument> {
    return this.KasseModel.findById(id);
  }

  async add(KasseDto: UpdateKasseDto): Promise<void | Kasse> {
    try {
      const newKasse = new this.KasseModel(KasseDto);
      const filter = { domainID: newKasse.domainID, kasse: newKasse.kasse };
      let isExist = await this.KasseModel.findOne(filter);
      if (isExist) {
        let toUpdate = Object.assign(isExist, newKasse, { _id: isExist._id });
        return await this.KasseModel.findByIdAndUpdate(
          isExist._id,
          toUpdate,
        ).catch((error) => {
          console.log(error);
        });
      }
      return newKasse.save().catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async addTimeout(KasseDto: UpdateKasseDto): Promise<void | Kasse> {
    const newKasse = new this.KasseModel(KasseDto);
    const filter = { domainID: KasseDto.domainID, kasse: KasseDto.kasse };
    let isExist = await this.KasseModel.findOne(filter);
    if (isExist) {
      KasseDto.timeouts.forEach((el) => {
        isExist.timeouts.push(el);
      });
      return await isExist.save().catch((error) => {
        console.log(error);
      });
    }
    return await newKasse.save().catch((error) => {
      console.log(error);
    });
  }

  async restart(KasseId: ByIdDto): Promise<string> {
    const PC = await this.KasseModel.findById(KasseId);
    if (typeof PC.externalUrl != 'undefined')
      return PC.externalUrl + '/restart';
  }

  async total(cond?: any): Promise<number> {
    var filter = await this.generateFilter(cond);
    return await this.KasseModel.countDocuments(filter);
  }
  //query every hour
  @Cron('30 21 * * * ')
  // @Cron('20 * * * * * ')
  async OneDayCron() {
    let uri = this.config.get<string>('KASSE_URI');
    const params = qs.stringify({
      secret_key: this.config.get<string>('SECRET_API'),
    });
    const responce = await this.httpService
      .post(uri + 'globalapi/login', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .toPromise();
    let responce2: AxiosResponse<any>;
    if (typeof responce.data.token != 'undefined') {
      responce2 = await this.httpService
        .get(uri + 'globalapi/tse_info?token=' + responce.data.token)
        .toPromise();
    }
    if (typeof responce2.data) {
      var result = responce2.data;
      result.forEach((element) => {
        let info = {
          domainName: element.login,
          domainID: element.id,
          fiscal_export_sw: element.fiscal_export_sw,
          fiscal_export_efr: element.fiscal_export_efr,
        };
        this.DomainsService.create(info);
        let resultKasse = element.kasses;
        let domain_id: number = element.id;
        if (typeof resultKasse != 'undefined')
          resultKasse.forEach((kasse) => {
            let kasseinfo: UpdateKasseDto = {
              domainID: domain_id,
              domainName: element.login,
              kasse: kasse.id,
              tseOn: kasse.tse_on,
              tseModule: kasse.tse_module,
            };
            this.add(kasseinfo);
          });
      });
    }
  }
  //every 5 minutes get new timeouts
  @Cron('*/5 * * * * ')
  async GetTimeoutsCron() {
    let uri = this.config.get<string>('KASSE_URI');
    const params = qs.stringify({
      secret_key: this.config.get<string>('SECRET_API'),
    });
    const responce = await this.httpService
      .post(uri + 'globalapi/login', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .toPromise();

    let responce2: AxiosResponse<any>;
    if (typeof responce.data.token != 'undefined') {
      var importTimeout = await this.ImportService.getLast({
        action: 'timeouts',
      });
      // prettier-ignore
      const condition:string = (importTimeout && importTimeout.externalId) ? `&last_import=${importTimeout.externalId}`:"";
      responce2 = await this.httpService
        .get(uri + 'globalapi/tse_log?token=' + responce.data.token + condition)
        .toPromise();
    }
    if (typeof responce2.data != 'undefined') {
      var result = Object.values(responce2.data);
      result.sort((a: any, b: any) => {
        return a.id - b.id;
      });
      if (result.length > 0) {
        result.forEach(async (element) => {
          let info = {
            domainID: element['domain_id'],
            kasse: element['kasse_id'],
            timeouts: [
              {
                timeout: element['timeout'],
                moment: new Date(element['timeout_moment']),
              },
            ],
          };
          let ttt = await this.addTimeout(info);
        });

        const lastElement = result.pop();
        await this.ImportService.create({
          action: 'timeouts',
          externalId: lastElement['id'],
        });
      }
    }
  }
}
