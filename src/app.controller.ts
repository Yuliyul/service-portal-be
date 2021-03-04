import { Controller, Get, LiteralObject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): LiteralObject {
    return this.appService.checkStatus();
  }
}
