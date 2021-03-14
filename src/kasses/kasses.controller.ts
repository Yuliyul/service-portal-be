import {
  Controller,
  Get,
  Post,
  Param,
  Req,
  HttpCode,
  Header,
  Body,
  HttpStatus,
  Delete,
  Response,
} from '@nestjs/common';
import { ApiProperty, ApiResponse, ApiHeader } from '@nestjs/swagger';
import * as express from 'express';
import { BaseKasseDto, ByIdDto, CreateKasseDto, UpdateKasseDto } from './dto';
import { KassesService } from './kasses.service';

@Controller('kasses')
export class KassesController {
  constructor(private readonly KassesService: KassesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Req() request: express.Request, @Response() res: express.Response) {
    const data = this.KassesService.getAll().then(function (result) {
      res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
      res.setHeader('X-Total-Count', result.length);
      res.send(result);
    });
    // return this.KassesService.getAll();
  }

  @Get(':id')
  @ApiProperty({
    name: 'id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: BaseKasseDto,
  })
  getOne(@Param() params: ByIdDto) {
    return this.KassesService.getOne(params.id);
  }

  @Post('restart')
  restart(@Req() request: express.Request): string {
    return 'all';
  }

  @Post('add')
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  add(@Body() CreateKasseDto: UpdateKasseDto) {
    return this.KassesService.add(CreateKasseDto);
  }
}
