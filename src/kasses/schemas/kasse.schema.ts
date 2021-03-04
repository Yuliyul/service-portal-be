import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type KasseDocument = Kasse & Document;
@Schema({
  timestamps: true,
})
export class Kasse extends Document {
  @Prop()
  platform: String;
  @Prop()
  osname: String;
  @Prop()
  arch: String;
  @Prop()
  uptime: Number;
  @Prop()
  freesysmem: String;
  @Prop()
  totalmem: String;
  @Prop()
  cpu: String;
  @Prop({ required: true })
  domainID: Number;
  @Prop({ required: true })
  kasse: Number;
  @Prop()
  diskСSpace: String;
  @Prop()
  diskСFreeSpace: String;
  @Prop()
  extip: String;
  @Prop([String])
  phpLastLine: string[];
  @Prop([String])
  terminalLastLine: string[];
  @Prop([String])
  FiscalLastLine: string[];
  @Prop()
  externalUrl: String;
  @Prop()
  FFVersion: String;
  @Prop()
  ChVersion: String;
  @Prop()
  mysqlversion: String;
  @Prop()
  domainName: String;
  @Prop([String])
  printer: string[];
  @Prop([String])
  uploadSpeed: string[];
  @Prop([String])
  downSpeed: string[];
}
export const KasseSchema = SchemaFactory.createForClass(Kasse);
KasseSchema.index({ domainID: 1, kasse: 1 }, { unique: true });
