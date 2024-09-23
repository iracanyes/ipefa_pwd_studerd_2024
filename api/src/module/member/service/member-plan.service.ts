import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  MemberPlan,
  MemberPlanCreatePayload,
  MemberPlanUpdatePayload,
} from '@member/model';
import { Repository } from 'typeorm';
import { Builder } from 'builder-pattern';
import {
  MemberPlanCreateException,
  MemberPlanDeleteException,
  MemberPlanListException,
  MemberPlanNotFoundException,
  MemberPlanUpdateException,
} from '@member/exception';

@Injectable()
export class MemberPlanService {
  private readonly logger: Logger = new Logger(MemberPlanService.name);

  constructor(
    @InjectRepository(MemberPlan)
    private readonly memberPlanRepository: Repository<MemberPlan>,
  ) {}

  async create(payload: MemberPlanCreatePayload): Promise<MemberPlan> {
    try {
      return await this.memberPlanRepository.save(
        Builder<MemberPlan>()
          .type(payload.type)
          .title(payload.title)
          .description(payload.description)
          .picture(payload.picture)
          .price(payload.price)
          .nbMonth(payload.nbMonth)
          .payment(payload.payment)
          .cumulative(payload.cumulative)
          .nbTraining(payload.nbTraining)
          .freqTraining(payload.freqTraining)
          .fullAccess(payload.fullAccess)
          .build(),
      );
    } catch (e) {
      this.logger.error(e);
      throw new MemberPlanCreateException();
    }
  }

  async update(payload: MemberPlanUpdatePayload): Promise<MemberPlan> {
    try {
      const detail = await this.memberPlanRepository.findOneBy({
        memberPlanId: payload.memberPlanId,
      });

      detail.type = payload.type;
      detail.title = payload.title;
      detail.description = payload.description;
      detail.picture = payload.picture;
      detail.price = payload.price;
      detail.nbMonth = payload.nbMonth;
      detail.nbTraining = payload.nbTraining;
      detail.payment = payload.payment;
      detail.cumulative = payload.cumulative;
      detail.freqTraining = payload.freqTraining;
      detail.fullAccess = payload.fullAccess;

      return await this.memberPlanRepository.save(detail);
    } catch (e) {
      this.logger.error(JSON.stringify(e));
      throw new MemberPlanUpdateException();
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const detail = await this.memberPlanRepository.findOneBy({
        memberPlanId: id,
      });
      await this.memberPlanRepository.remove(detail);
    } catch (e) {
      this.logger.error(JSON.stringify(e));
      throw new MemberPlanDeleteException();
    }
  }

  async detail(id: string): Promise<MemberPlan> {
    try {
      const detail = await this.memberPlanRepository.findOneBy({
        memberPlanId: id,
      });

      return detail;
    } catch (e) {
      this.logger.error(JSON.stringify(e));
      throw new MemberPlanNotFoundException();
    }
  }

  async getAll(): Promise<MemberPlan[]> {
    try {
      return await this.memberPlanRepository.find();
    } catch (e) {
      this.logger.error(JSON.stringify(e));
      throw new MemberPlanListException();
    }
  }
}
