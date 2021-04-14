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
  HttpService,
  Delete,
  Response,
} from '@nestjs/common';
import { ApiProperty, ApiResponse, ApiHeader } from '@nestjs/swagger';
import * as express from 'express';
import { BaseKasseDto, ByIdDto, CreateKasseDto, UpdateKasseDto } from './dto';
import { KassesService } from './kasses.service';
import { AuthService } from './../auth/auth.service';
import { LocalAuthGuard } from './../auth/local-auth.guard';
import { Public } from './../public';

@Controller('kasses')
export class KassesController {
  constructor(
    private readonly KassesService: KassesService,
    private httpService: HttpService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Req() request: express.Request,
    @Response() res: express.Response,
  ) {
    const total = await this.KassesService.total(request.query);
    const result = await this.KassesService.getAll(request.query);
    res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
    res.setHeader('X-Total-Count', total);
    res.send(result);
  }

  @Get('partconnected')
  async partconnected(
    @Req() request: express.Request,
    @Response() res: express.Response,
  ) {
    console.log('partconnected');

    const kasses = await this.KassesService.getPartiallyConnectedToTSE();
    res.send(kasses);
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

  @Delete(':id')
  async deleteKasse(@Param() params: ByIdDto) {
    return this.KassesService.deleteOne(params.id);
  }

  @Post('restart')
  async restart(@Body() KasseId: ByIdDto) {
    const PC = await this.KassesService.restart(KasseId);
    if (typeof PC != 'undefined' && typeof PC.externalUrl != 'undefined') {
      const restartUrl = PC.externalUrl + '/restart';
      this.httpService.post(restartUrl);
      return PC;
    } else return 'nok';
  }

  @Post('add')
  // @UseGuards(LocalAuthGuard)
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  add(@Body() CreateKasseDto: UpdateKasseDto) {
    return this.KassesService.add(CreateKasseDto);
  }

  @Post('timeout')
  // @UseGuards(LocalAuthGuard)
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  timeout(@Body() CreateKasseDto: UpdateKasseDto) {
    return this.KassesService.addTimeout(CreateKasseDto);
  }
}
