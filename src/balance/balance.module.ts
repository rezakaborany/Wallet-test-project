import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Balance, BalanceSchema } from './schema/balance.schema';
import { BalanceController } from './balance.controller';
import { Transaction, TransactionSchema } from './schema/transaction.schema';

@Module({
  providers: [BalanceService],
  controllers: [BalanceController],
  imports: [MongooseModule.forFeature([
    {
      name: Balance.name,
      schema: BalanceSchema
    },
    {
      name: Transaction.name,
      schema: TransactionSchema
    }
  ])]
})
export class BalanceModule { }
