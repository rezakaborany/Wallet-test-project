import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BalanceService } from './balance.service';
import { BalanceDto, CheckUserIdDto } from './dto/balance.dto';

@ApiTags('Balance')
@Controller()
export class BalanceController {
   constructor(private readonly balanceService: BalanceService) { }

   @Get('balance/daily')
   @ApiResponse({ status: 200, description: 'Returns the total amount of transactions processed for the day' })
   async getDailyTotal(): Promise<{ total_amount: Number }> {
      return this.balanceService.calculateDailyTotal();
   }

   @ApiParam({ name: 'userId', type: Number })
   @Get('balance/:userId')
   async check(@Param() params: CheckUserIdDto): Promise<{ balance: Number }> {
      return this.balanceService.getBalance(params.userId)
   }

   @Post('money')
   @ApiBody({
      type: BalanceDto
   })
   async updateWallet(@Body() body: BalanceDto): Promise<{ reference_id: Number }> {
      return this.balanceService.updateBalance(body);
   }
}