import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { BalanceModule } from './balance/balance.module';
import { HttpExceptionFilter } from 'common/http-exception.filter';

@Module({
  imports: [
    BalanceModule,
    MongooseModule.forRoot('mongodb://localhost/balance-test-project')],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  }],
})
export class AppModule { }
