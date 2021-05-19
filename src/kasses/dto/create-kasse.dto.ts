import { Timeout, DownSpeed } from './../schemas/kasse.schema';

export class CreateKasseDto {
  platform: string;
  osname: string;
  arch: string;
  uptime: number;
  freesysmem: string;
  totalmem: string;
  cpu: string;
  domainID: number;
  kasse: number;
  diskСSpace: string;
  diskСFreeSpace: string;
  extip: string;
  phpLastLine: Array<string>;
  terminalLastLine: Array<string>;
  FiscalLastLine: Array<string>;
  externalUrl: string;
  FFVersion: string;
  ChVersion: string;
  domainName: string;
  printer: Array<any>;
  uploadSpeed: Array<string>;
  downSpeed: DownSpeed;
  tseOn: boolean;
  tseModule: string;
  tseEFRType: string;
  timeouts: Array<Timeout>;
  isDeleted: boolean;
}
