import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignupPayload {
  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 10)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 10)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  mail: string;

  @ApiProperty()
  googleHash: string;

  @ApiProperty()
  facebookHash: string;
}
