import { Module } from '@nestjs/common';
import { MemberController, MemberPlanController } from '@member/controller';
import { MemberPlanService, MemberService } from '@member/service';
import {
  BaseEntity,
  Address,
  Member,
  MemberPlan,
  MemberSubscription,
} from '@member/model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BaseEntity,
      Address,
      Member,
      MemberPlan,
      MemberSubscription,
    ]),
  ],
  providers: [MemberService, MemberPlanService],
  controllers: [MemberController, MemberPlanController],
  exports: [],
})
export class MemberModule {}
