import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate, IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Gender } from '@member/enum';
import { Address, MemberSubscription } from '@member/model';

export class MemberCreatePayload {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(1, 50)
  firstname: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Length(1, 50)
  lastname: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  birthdate: string;

  @ApiProperty()
  @IsEnum(Gender)
  @IsOptional()
  gender: Gender;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  @Length(1, 50)
  mail: string;

  @ApiProperty()
  @IsOptional()
  @Length(1, 50)
  phone: string;

  @ApiProperty()
  @IsOptional()
  @Length(1, 34)
  iban: string;

  @ApiProperty()
  @IsOptional()
  @Length(1, 10)
  codeActivation: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  subscriptions: MemberSubscription[];

  @ApiProperty()
  @IsOptional()
  address: Address;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  active: boolean;
}
