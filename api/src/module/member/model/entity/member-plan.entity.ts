import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { memberPlanPkGenerator } from '@common/config';
import { BaseEntity, MemberSubscription } from './index';
import {
  MemberPlanFreqTrainingType,
  MemberPlanPaymentType,
  MemberPlanType,
} from '@member/enum';

@Entity()
export class MemberPlan extends BaseEntity {
  @PrimaryColumn('varchar', {
    name: 'member_plan_id',
    length: 26,
    default: () => `'${memberPlanPkGenerator()}'`,
  })
  memberPlanId: string;

  @Column({
    name: 'type',
    type: 'varchar',
    default: MemberPlanType.SUBSCRIPTION,
  })
  type: MemberPlanType;

  @Column({ name: 'title', unique: true, length: 80, nullable: false })
  title: string;

  @Column('text', { name: 'description', nullable: true })
  description: string;

  @Column({ name: 'picture', length: 40, nullable: true })
  picture: string;

  @Column({
    name: 'payment',
    type: 'varchar',
    default: MemberPlanPaymentType.MENSUAL,
  })
  payment: MemberPlanPaymentType;

  @Column({
    name: 'freq_training',
    type: 'varchar',
    default: MemberPlanFreqTrainingType.PER_WEEK,
  })
  freqTraining: MemberPlanFreqTrainingType;

  @Column('float', { name: 'price', nullable: false })
  price: number;

  @Column('int', { name: 'nb_month', nullable: false })
  nbMonth: number;

  @Column('int', { name: 'nb_training', default: 7 })
  nbTraining: number;

  @Column({ name: 'cumulative', type: 'boolean', default: true })
  cumulative: boolean;

  @Column({ name: 'full_access', type: 'boolean' })
  fullAccess: boolean;

  @OneToMany(() => MemberSubscription, (ms) => ms.memberPlan, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'member_subscription_id_fk',
    referencedColumnName: 'member_subscription_id',
  })
  subscriptions: MemberSubscription[];
}
