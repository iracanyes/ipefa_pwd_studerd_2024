/**
 * This enum contains all keys of our environments variables in .env file (at the root of the project)
 * We will use dotenv librairies to retrieve those environments variables
 * In order to load those environments variables, we will execute the below method before the ConfigManager class
 * and in all other places where environments variables are needed.
 */
//import 'dotenv/config';

export enum ConfigKey {
  DB_TYPE = 'BACKEND_DB_TYPE',
  DB_HOST = 'BACKEND_DB_HOST',
  DB_PORT = 'BACKEND_DB_PORT',
  DB_USER = 'BACKEND_DB_ADMIN',
  DB_PASSWORD = 'BACKEND_DB_PASSWORD',
  DB_DATABASE = 'BACKEND_DB_NAME',
  DB_SYNC = 'BACKEND_DB_SYNC',
  DB_LOGGING = 'BACKEND_DB_LOGGING',
  JWT_TOKEN_SECRET = 'BACKEND_JWT_TOKEN_SECRET',
  JWT_TOKEN_EXPIRE_IN = 'BACKEND_JWT_TOKEN_EXPIRE_IN',
  JWT_REFRESH_TOKEN_SECRET = 'BACKEND_JWT_REFRESH_TOKEN_SECRET',
  JWT_REFRESH_TOKEN_EXPIRE_IN = 'BACKEND_JWT_REFRESH_TOKEN_EXPIRE_IN',
  APP_BASE_URL = 'API_BASE_URL',
  APP_MODE = 'API_MODE',
  APP_PORT = 'API_PORT',
  APP_HOST = 'API_HOST',
}

export const configMinimalKeys: ConfigKey[] = Object.keys(
  ConfigKey,
) as ConfigKey[];
