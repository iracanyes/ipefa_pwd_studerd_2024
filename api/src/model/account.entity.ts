/*
 *
 */
import { Entity, PrimaryColumn, Column } from 'typeorm';
import { ulid } from 'ulid';

@Entity()
export class AccountEntity {
  @PrimaryColumn('varchar', { length: 26, default: () => `'${ulid()}'`})
  private _id: string;

  @Column({ unique: true, nullable: true })
  private _email: string;

  @Column({ nullable: true })
  private _firstName: string;

  @Column({ nullable: true })
  private _lastName: string;

  constructor(id: string, email: string, firstName: string, lastName: string) {
    this._id = id;
    this._email = email;
    this._firstName = firstName;
    this._lastName = lastName;
  }

  get id(): string {
    return this._id;
  }

  get email() {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get firstName() {
    return this._firstName;
  }

  set firstName(firstName: string) {
    this._firstName = firstName;
  }

  get lastName() {
    return this._lastName;
  }

  set lastName(lastName: string) {
    this._lastName = lastName;
  }
}
