/**
 *
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { Builder } from 'builder-pattern';
import { Account } from '../model/account.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiCodeResponse, ApiResponse } from '@common/api';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  async findAll() {
    const accounts = await this.accountService.findAll();
    return {
      code: ApiCodeResponse.SUCCESS,
      result: true,
      data: accounts,
    };
  }

  @ApiOperation({
    summary: 'Get AccountEntity',
    description: 'Get AccountEntity Information',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse> {
    const account = this.accountService.findById(id);

    return {
      code: ApiCodeResponse.SUCCESS,
      result: true,
      data: account,
    };
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createAccount(@Body() data: Account): Promise<ApiResponse> {
    if (data == null) {
      throw new HttpException('Incorrect body', HttpStatus.NOT_FOUND);
    }

    const accountDto = Builder<Account>()
      .email(data.email)
      .firstName(data.firstName)
      .lastName(data.lastName)
      .build();

    const account = await this.accountService.create(accountDto);

    return {
      code: ApiCodeResponse.ACCOUNT_CREATED,
      result: true,
      data: account,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateAccount(@Param('id') id: string, @Body() data: Account): Promise<ApiResponse> {
    const account = await this.accountService.update(id, data);

    return {
      code: ApiCodeResponse.ACCOUNT_UPDATED,
      result: true,
      data: account,
    };
  }

  @Delete('delete/:id')
  async deleteAccount(@Param('id') id: string): Promise<ApiResponse> {
    const data = await this.accountService.delete(id);

    return {
      code: ApiCodeResponse.ACCOUNT_DELETED,
      result: true,
      data: data,
    };
  }
}
