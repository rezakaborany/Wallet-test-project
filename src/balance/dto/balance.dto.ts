import { IsMongoId, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class BalanceDto {
    @ApiProperty({ type: 'number', required: true })
    @IsNumber()
    userId: number;

    @ApiProperty({ type: 'number', required: true })
    @IsNumber()
    amount: number;
}

export class CheckUserIdDto {
    @IsNumber()
    userId: number;
}