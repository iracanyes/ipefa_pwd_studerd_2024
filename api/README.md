# Nest JS project 

## Install Nest JS globally

````shell
$ npm i -g @nestjs/cli
$ nest new project-name
$ cd project-name
````

### Install dependencies

Here are the dependencies installed:
- [Lodash - Utility library](https://lodash.com/)
- [Date FNS - Date library](https://date-fns.org/)
- [BCrypt - Cryptographic library](https://www.npmjs.com/package/bcrypt)
- [JWT - Authentication library](https://www.npmjs.com/package/jwt)
- [Swagger - API Documentation library](https://swagger.io/)
- [DotEnv - Environment variables injection](https://www.npmjs.com/package/dotenv)
- [Ulid - UUID Generator library](https://www.npmjs.com/package/ulid)
- [TypeORM - ORM library](https://www.npmjs.com/package/@nestjs/typeorm)
- [PG - PostgreSQL Connector library](https://www.npmjs.com/package/pg)
- [Builder Pattern - Builder Pattern library](https://www.npmjs.com/package/builder-pattern)
- [Class-Validator - Sanitization library](https://www.npmjs.com/package/class-validator)
- [Class Transformer - Class Maniputlation helper library](https://www.npmjs.com/package/class-transformer)
````shell
### Production dependencies
$ npm i lodash @types/lodash \
date-fns @types/date-fns \
bcrypt @types/bcrypt \
@nestjs/jwt \
@nestjs/swagger swagger-ui-express \
dotenv \
ulid \
@nestjs/typeorm typeorm pg \
builder-pattern  \
class-validator class-transformer 
### Dev dependencies
$ npm i --save-dev 
````

## NestJS CLI
### Generate Resources 
For quickly creating a CRUD controller with the validation built-in, you may use the CLI's CRUD generator: 
````shell
$ nest g resource [name].
````
 