import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Balance extends Document {
    @Prop({ type: Number  , required : true})
    userId: Number;

    @Prop({ type: Number  , required : true})
    balance : Number;
}

export const BalanceSchema = SchemaFactory.createForClass(Balance);