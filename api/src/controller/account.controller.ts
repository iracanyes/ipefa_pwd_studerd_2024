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
  Post, Put,
} from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { Builder } from 'builder-pattern';
import { Account } from '../model/account.interface';

@Controller('accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    const account = this.accountService.findById(id);

    return account;
  }

  @Get()
  findAll() {
    const accounts = this.accountService.findAll();
    return accounts;
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createAccount(@Body() data: Account): Promise<Account> {
    if (data == null) {
      throw new HttpException('Incorrect body', HttpStatus.NOT_FOUND);
    }

    const accountDto = Builder<Account>()
      .email(data.email)
      .firstName(data.firstName)
      .lastName(data.lastName)
      .build();

    const account = await this.accountService.create(accountDto);

    return account;
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateAccount(@Param('id') id: string, @Body() data: Account): Promise<Account> {
    const account = await this.accountService.update(id, data);

    return account;
  }

  @Delete('delete/:id')
  async deleteAccount(@Param('id') id: string) {
    this.accountService.delete(id);
  }
}
