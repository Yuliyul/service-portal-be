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
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { BaseKasseDto, ByIdDto, CreateKasseDto, UpdateKasseDto } from './dto';
import { KassesService } from './kasses.service';

@Controller('kasses')
export class KassesController {
  constructor(private readonly KassesService: KassesService) {}

  @Get()
  findAll(@Req() request: Request) {
    return this.KassesService.getAll();
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
