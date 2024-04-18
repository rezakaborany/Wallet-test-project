import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Balance } from './schema/balance.schema';
import { BalanceDto } from './dto/balance.dto';
import { Transaction } from './schema/transaction.schema';

@Injectable()
export class BalanceService {
    constructor(
        @InjectModel(Balance.name) private readonly model: Model<Balance>,
        @InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>
    ) { }

    async getBalance(userId: number): Promise<{ balance: Number }> {
        const user = await this.model.findOne({ userId });
        return { balance: user?.balance ? user.balance : 0 }
    }

    async updateBalance(body: BalanceDto): Promise<{ reference_id: Number }> {
        const { amount, userId } = body
        //goal : update balance
        await this.updateWallet({ userId, amount })
        const reference_id = Math.floor(Math.random() * 1000000000);
        //goal : log all transaction
        await this.logTransaction({ userId, amount, reference_id })
        return { reference_id }
    }

    async logTransaction(data: { userId: Number, amount: Number, reference_id: Number }) {
        return this.transactionModel.create(data)
    }

    async updateWallet(data: { userId: Number, amount: Number }) {
        return this.model.findOneAndUpdate(
            { userId: data.userId },
            { $inc: { balance: data.amount } },
            { new: true, upsert: true },
        );
    }

    async calculateDailyTotal(): Promise<{ total_amount: Number }> {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const total = await this.transactionModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: today, $lt: tomorrow }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$amount' }
                }
            }
        ]);

        if (total.length > 0) {
            return { total_amount: total[0].totalAmount };
        }

        return { total_amount: 0 };
    }
}
