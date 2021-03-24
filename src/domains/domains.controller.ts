import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Req,
  Response,
} from '@nestjs/common';
import { DomainsService } from './domains.service';
import * as express from 'express';

@Controller('domains')
export class DomainsController {
  constructor(private readonly DomainService: DomainsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Req() request: express.Request,
    @Response() res: express.Response,
  ) {
    const total = await this.DomainService.total(request.query);
    const data = await this.DomainService.getAll(request.query);
    res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
    res.setHeader('X-Total-Count', total);
    res.send(data);
  }

  @Get(':id')
  getOne(@Param() params: string) {
    console.log(params);
    return this.DomainService.getAll(params);
  }
}
