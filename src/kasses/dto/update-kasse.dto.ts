export class UpdateKasseDto {
  platform: string;
  osname: string;
  arch: string;
  uptime: string;
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
  downSpeed: Array<string>;
}
