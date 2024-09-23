import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { BaseEntity, Address, MemberSubscription } from './index';
import { memberPkGenerator } from '@common/config';
import { Gender } from '@member/enum';
import { isNil } from 'lodash';

@Entity()
export class Member extends BaseEntity {
  @PrimaryColumn('varchar', {
    name: 'id',
    length: 26,
    default: () => `'${memberPkGenerator()}'`,
  })
  member_id: string;

  @Column('varchar', { name: 'mail', length: 50 })
  mail: string;

  @Column({ name: 'firstname', length: 50 })
  firstname: string;

  @Column({ name: 'lastname', length: 50 })
  lastname: string;

  @Column({ name: 'gender', length: 10, default: Gender.OTHER })
  gender: Gender;

  @CreateDateColumn({ name: 'birthdate' })
  birthdate: Date;

  @Column({ name: 'phone', length: 15, nullable: true })
  phone: string;

  @Column({ name: 'code_activation', length: 10, default: false })
  codeActivation: string;

  @Column({ name: 'iban', length: 34, nullable: true })
  iban: string;

  @Column({ name: 'active', type: 'boolean', default: false })
  active: boolean;

  @OneToOne(() => Address, { cascade: true, eager: true })
  @JoinColumn({
    name: 'address_id_fk',
    referencedColumnName: 'address_id',
  })
  address: Address;

  @OneToMany(() => MemberSubscription, (ms) => ms.member, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'member_subscription_id_fk',
    referencedColumnName: 'member_subscription_id',
  })
  subscriptions: MemberSubscription[];

  @BeforeInsert()
  setId() {
    console.log("I'm here", this.codeActivation);
    this.codeActivation = isNil(this.codeActivation)
      ? memberPkGenerator().substring(0, 10)
      : this.codeActivation;
  }
}
