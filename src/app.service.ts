import { Injectable, LiteralObject } from '@nestjs/common';

@Injectable()
export class AppService {
  checkStatus(): LiteralObject {
    return { status: 'ok' };
  }
}
