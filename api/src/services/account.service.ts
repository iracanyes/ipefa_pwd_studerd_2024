import { Injectable } from '@nestjs/common';
import { Account } from '../model/account.interface';

@Injectable()
export class AccountService {
  findById(id: string) {
    return null;
  }

  async findAll() {
    return [{ id: '1', firstname: 'John', lastname: 'Doe' }];
  }

  async create(accountDto: Account) {
    let result = null;

    return result;
  }

  async update(id: string, accountDto: Account) {
    let result = null;

    return result;
  }

  async delete(id: string) {
    const account = null;

    return account;
  }
}
