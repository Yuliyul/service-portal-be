import { ApiProperty } from '@nestjs/swagger';

export class BaseKasseDto {
  @ApiProperty()
  platform: string;

  @ApiProperty()
  osname: string;

  @ApiProperty()
  arch: string;

  @ApiProperty()
  uptime: string;

  @ApiProperty()
  freesysmem: string;

  @ApiProperty()
  totalmem: string;

  @ApiProperty()
  cpu: string;

  @ApiProperty({})
  domainID: number;

  @ApiProperty({})
  kasse: number;

  @ApiProperty()
  diskСSpace: string;

  @ApiProperty()
  diskСFreeSpace: string;

  @ApiProperty()
  extip: string;

  @ApiProperty({
    example: [],
  })
  phpLastLine: Array<string>;

  @ApiProperty({
    example: [],
  })
  terminalLastLine: Array<string>;

  @ApiProperty({
    example: [],
  })
  FiscalLastLine: Array<string>;

  @ApiProperty()
  externalUrl: string;

  @ApiProperty()
  FFVersion: string;

  @ApiProperty()
  ChVersion: string;

  @ApiProperty()
  domainName: string;

  @ApiProperty({ example: [] })
  printer: Array<any>;

  @ApiProperty({
    example: [],
  })
  uploadSpeed: Array<string>;

  @ApiProperty({
    example: [],
  })
  downSpeed: Array<string>;
}
