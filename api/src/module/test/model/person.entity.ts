/*
 *
 */
import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Car } from './car.entity';
import { Account } from './account.entity';
import { personPkGenerator } from '@common/config';

@Entity()
export class Person {
  @PrimaryColumn('varchar', {
    length: 26,
    default: () => `'${personPkGenerator()}'`,
  })
  person_id: string;

  @Column({ name: 'email', unique: true, nullable: true })
  email: string;

  @Column({ name: 'firstname', nullable: true })
  firstName: string;

  @Column({ name: 'lastname', nullable: true })
  lastName: string;

  @Column({ name: 'gender', nullable: true })
  gender: string;

  @Column({ name: 'birthdate', nullable: true })
  birthdate: Date;

  /**
   * eager : allow to retrieve the associated objets
   */
  @OneToMany(() => Car, (car) => car.owner, { cascade: true, eager: true })
  cars: Car[];

  @ManyToMany(() => Account, (account) => account.owners)
  @JoinTable({
    name: 'person_account',
    inverseJoinColumn: {
      name: 'account_id_fk',
      referencedColumnName: 'account_id',
    },
    joinColumn: { name: 'person_id_fk', referencedColumnName: 'person_id' },
  })
  accounts: Account[];
}
