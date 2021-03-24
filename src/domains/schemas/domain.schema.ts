import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mixed } from 'mongoose';
export type DomainDocument = Domain & Document;
import * as mongoose from 'mongoose';
@Schema({
  timestamps: true,
})
export class Domain extends Document {
  @Prop()
  domainName: String;

  @Prop()
  domainID: Number;

  @Prop()
  fiscal_export_sw: Boolean;

  @Prop()
  fiscal_export_efr: Boolean;
}
export const DomainSchema = SchemaFactory.createForClass(Domain);
DomainSchema.index({ domainID: 1 }, { unique: true });

// Duplicate the ID field.
DomainSchema.virtual('id').get(function () {
  return this.domainID;
});

// Ensure virtual fields are serialised.
DomainSchema.set('toJSON', {
  virtuals: true,
});
