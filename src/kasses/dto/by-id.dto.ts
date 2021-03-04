import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class ByIdDto {
  @IsMongoId()
  @ApiProperty()
  id: string;
}
