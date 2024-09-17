/**
 * Config Manager class handle configuration of the application.
 * and retrieving environment variables.
 * We will use getValues to retrieve environment variables.
 * and ensureValues method to validate all required environment variables are set at init of the app
 */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigKey, configMinimalKeys } from '@common/enum/config-key.enum';
import 'dotenv/config';
import { Person } from '@model/person.entity';
import { Account } from '@model/account.entity';
import { Address } from '@model/address.entity';
import { Token } from '@security/model';
import { Credential } from '@security/model';
import { Car } from '@model/car.entity';

class ConfigManager {
  constructor(private env: { [k: string]: string | undefined }) {}

  public ensureValues(keys: ConfigKey[]): ConfigManager {
    keys.forEach((key: ConfigKey) => this.getValue(ConfigKey[key], true));

    return this;
  }

  getValue(key: ConfigKey, throwOnMissing: boolean = true): string {
    const value = this.env[key];

    if (!value && throwOnMissing) {
      //console.log(this.env);
      throw new Error(`Config error - missing env.${key}`);
    }

    return value;
  }

  /**
   * Allow to configure TypeOrm
   */
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: this.getValue(ConfigKey.DB_TYPE) as any,
      host: this.getValue(ConfigKey.DB_HOST),
      port: parseInt(this.getValue(ConfigKey.DB_PORT)),
      username: this.getValue(ConfigKey.DB_USER),
      password: this.getValue(ConfigKey.DB_PASSWORD),
      database: this.getValue(ConfigKey.DB_DATABASE),
      entities: [Person, Account, Address, Car, Credential, Token],
      subscribers: [],
      // Only in dev mode, migrate all changes made to entities
      synchronize:
        this.getValue(ConfigKey.DB_SYNC) === 'true' &&
        this.getValue(ConfigKey.APP_MODE) === 'DEV',
      logging: this.getValue(ConfigKey.DB_LOGGING) === 'true',
    };
  }
}

//console.log(process.env);
//console.log(`configMinimalKeys \n: ${configMinimalKeys}\n`);

const configManager = new ConfigManager(process.env).ensureValues(
  configMinimalKeys,
);

export { configManager };
