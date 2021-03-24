import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ImportDocument = Import & Document;

@Schema({
  timestamps: true,
})
export class Import extends Document {
  @Prop()
  action: String;
  @Prop()
  externalId?: Number;
}
export const ImportSchema = SchemaFactory.createForClass(Import);
ImportSchema.index({ action: 1 }, { unique: true });
