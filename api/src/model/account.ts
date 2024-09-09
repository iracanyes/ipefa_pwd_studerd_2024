/*
 *
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  private _id: string;

  @Column()
  private _email: string;

  @Column()
  private _firstName: string;
  @Column()
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
