import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { memberSubscriptionPkGenerator } from '@common/config';
import { BaseEntity, Member, MemberPlan } from './index';

@Entity()
export class MemberSubscription extends BaseEntity {
  @PrimaryColumn('varchar', {
    name: 'member_subscription_id',
    length: 26,
    default: () => `'${memberSubscriptionPkGenerator()}'`,
  })
  memberSubscriptionId: string;

  @CreateDateColumn({ name: 'start_date', nullable: false })
  startDate: Date;

  @Column({ name: 'active', type: 'boolean', nullable: false })
  active: boolean;

  @ManyToOne(() => Member, (member) => member.subscriptions, { eager: false })
  member: Member;

  @ManyToOne(() => MemberPlan, (memberPlan) => memberPlan.subscriptions, {
    eager: true,
  })
  memberPlan: MemberPlan;
}
