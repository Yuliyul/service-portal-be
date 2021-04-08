import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mixed } from 'mongoose';
export type KasseDocument = Kasse & Document;
import * as mongoose from 'mongoose';

@Schema()
export class Timeout {
  @Prop()
  timeout: Number;

  @Prop()
  moment: Date;
}
export const TimeoutSchema = SchemaFactory.createForClass(Timeout);

@Schema({
  timestamps: true,
})
export class Kasse extends Document {
  @Prop()
  timeouts: Timeout[];

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

  @Prop({ type: [String] })
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
  @Prop({ type: [mongoose.Schema.Types.Mixed] })
  printer: Mixed[];
  @Prop({ type: mongoose.Schema.Types.Mixed })
  uploadSpeed: Mixed;
  @Prop({ type: mongoose.Schema.Types.Mixed })
  downSpeed: Mixed;
  @Prop()
  tseOn: Boolean;
  @Prop()
  tseModule: String;
  @Prop()
  tseEFRType: String;
  @Prop()
  isDeleted: Boolean;
}
export const KasseSchema = SchemaFactory.createForClass(Kasse);
KasseSchema.index({ domainID: 1, kasse: 1 }, { unique: true });

// Duplicate the ID field.
KasseSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
KasseSchema.set('toJSON', {
  virtuals: true,
});
