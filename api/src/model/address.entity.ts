import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { ulid } from 'ulid';
import { Person } from './person.entity';

@Entity()
export class Address {
  @PrimaryColumn('varchar', { length: 256, default: () => `'${ulid()}'` })
  address_id: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  number: string;

  @OneToOne(() => Person, { onDelete: 'CASCADE' })
  person: Person;
}
