import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { Person } from './person.entity';
import { accountPkGenerator } from '@common/config';

@Entity()
export class Account {
  @PrimaryColumn('varchar', {
    name: 'id',
    length: 26,
    default: () => `'${accountPkGenerator()}'`,
  })
  account_id: string;

  @Column({ name: 'card_number', unique: true, nullable: false })
  card_number: number;

  @ManyToMany(() => Person, (person) => person.accounts)
  owners: Person[];
}
