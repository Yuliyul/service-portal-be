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
} from '@nestjs/common';
import { Request } from 'express';
import { CreateKasseDto } from './dto/create-kasse.dto';
import { UpdateKasseDto } from './dto/update-kasse.dto';
import { KassesService } from './kasses.service';

@Controller('kasses')
export class KassesController {
  constructor(private readonly KassesService: KassesService) {}

  @Get()
  findAll(@Req() request: Request) {
    return this.KassesService.getAll();
  }

  @Get(':id')
  getOne(@Param() params) {
    return this.KassesService.getOne(params.id);
  }

  @Post('restart')
  restart(@Req() request: Request): string {
    return 'all';
  }

  @Post('add')
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  add(@Body() CreateKasseDto: CreateKasseDto) {
    return this.KassesService.add(CreateKasseDto);
  }
}
