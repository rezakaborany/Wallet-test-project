import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Transaction extends Document {
    @Prop({ type: Number, required: true })
    userId: Number;

    @Prop({ type: Number, required: true })
    amount: Number;

    @Prop({ type: Number, required: true })
    reference_id: Number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);