import { Test, TestingModule } from '@nestjs/testing';
import { BalanceService, } from '../balance.service';
import { getModelToken } from '@nestjs/mongoose';
import { Balance } from '../schema/balance.schema';
import { BalanceController } from '../balance.controller';
import { Transaction } from '../schema/transaction.schema';
import { BalanceDto } from '../dto/balance.dto';

describe('test for balance', () => {
  let controller: BalanceController;
  let service: BalanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BalanceController],
      providers: [BalanceService,
        {
          provide: getModelToken(Balance.name),
          useValue: Balance,
        },
        {
          provide: getModelToken(Transaction.name),
          useValue: Transaction,
        },
      ],
    }).compile();

    controller = module.get<BalanceController>(BalanceController);
    service = module.get<BalanceService>(BalanceService);
  });

  describe('check balance', () => {
    it('check balance', async () => {
      const dto = { userId: 1 };
      const expectedResult: any = { balance: 0 }

      jest.spyOn(service, 'getBalance').mockResolvedValue(expectedResult);

      expect(await controller.check(dto)).toBe(expectedResult);
    });
  })

  describe('update balance', () => {
    it('update  balance', async () => {
      const dto : BalanceDto= { userId: 1  , amount : 5};
      const expectedResult: any = { reference_id : Number }

      jest.spyOn(service, 'updateBalance').mockResolvedValue(expectedResult);

      expect(await controller.updateWallet(dto)).toBe(expectedResult);
    });
  })

  describe('check balance', () => {
    it('check balance', async () => {
      const dto = { userId: 1 };
      const expectedResult: any = { balance: 5 }

      jest.spyOn(service, 'getBalance').mockResolvedValue(expectedResult);

      expect(await controller.check(dto)).toBe(expectedResult);
    });
  })

  describe('daily  balance', () => {
    it('daily  balance', async () => {
      const expectedResult: any = { total_amount : 5 }

      jest.spyOn(service, 'calculateDailyTotal').mockResolvedValue(expectedResult);

      expect(await controller.getDailyTotal()).toBe(expectedResult);
    });
  })

  describe('update balance after subtract', () => {
    it('update  balance', async () => {
      const dto : BalanceDto= { userId: 1  , amount : -5};
      const expectedResult: any = { reference_id : Number }

      jest.spyOn(service, 'updateBalance').mockResolvedValue(expectedResult);

      expect(await controller.updateWallet(dto)).toBe(expectedResult);
    });
  })

  describe('daily  balance after subtract', () => {
    it('daily  balance', async () => {
      const expectedResult: any = { total_amount : 0 }

      jest.spyOn(service, 'calculateDailyTotal').mockResolvedValue(expectedResult);

      expect(await controller.getDailyTotal()).toBe(expectedResult);
    });
  })
})