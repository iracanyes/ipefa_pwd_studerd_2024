import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Person } from './person.entity';
import { carPkGenerator } from '@common/config';

@Entity()
export class Car {
  @PrimaryColumn('varchar', {
    length: 26,
    default: () => `'${carPkGenerator()}'`,
  })
  car_id: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  color: string;

  /**
   * IMPORTANT: eager must be true for only one side of the relation or infinite loading loop will crush the app
   * @private
   */
  @ManyToOne(() => Person, (person) => person.cars, {
    cascade: false, // Must be set to false if Person.cars has cascade true
    eager: false, // Must be false if person.cars got eager=true
  })
  @JoinColumn({ referencedColumnName: 'person_id', name: 'person_id_fk' })
  owner: Person;
}
