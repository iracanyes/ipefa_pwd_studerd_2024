import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Person } from '@module-test/model/person.entity';
import { addressPkGenerator } from '@common/config';

@Entity()
export class Address {
  @PrimaryColumn('varchar', {
    length: 26,
    default: () => `'${addressPkGenerator()}'`,
  })
  address_id: string;

  @Column({ length: 50, unique: false, nullable: true })
  street: string;

  @Column({ length: 8, unique: false, nullable: true })
  number: string;

  @Column({ length: 50, unique: false, nullable: true })
  town: string;

  @Column({ length: 10, unique: false, nullable: true })
  zipCode: string;

  @Column({ length: 50, unique: false, nullable: true })
  country: string;

  @Column({ nullable: true, unique: false })
  complement: string;
}
