import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import {
  MemberPlanFreqTrainingType,
  MemberPlanPaymentType,
  MemberPlanType,
} from '@member/enum';

export class MemberPlanCreatePayload {
  @ApiProperty()
  @IsOptional()
  @IsEnum(MemberPlanType)
  type: MemberPlanType;

  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 80)
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @Length(1, 40)
  picture: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  nbMonth: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(MemberPlanPaymentType)
  payment: MemberPlanPaymentType;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  cumulative: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  nbTraining: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(MemberPlanFreqTrainingType)
  freqTraining: MemberPlanFreqTrainingType;

  @ApiProperty()
  @IsBoolean()
  fullAccess: boolean;
}
