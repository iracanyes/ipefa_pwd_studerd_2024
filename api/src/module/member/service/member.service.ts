import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Member,
  MemberCreatePayload, MemberSubscription,
  MemberUpdatePayload,
} from '@member/model';
import { Repository } from 'typeorm';
import { Builder } from 'builder-pattern';
import {
  MemberCreateException,
  MemberDeleteException,
  MemberListException,
  MemberNotFoundException,
  MemberUpdateException,
} from '@member/exception';
import { isNil } from 'lodash';

@Injectable()
export class MemberService {
  private readonly logger = new Logger(MemberService.name);

  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async create(payload: MemberCreatePayload): Promise<Member> {
    try {
      const newMember = Object.assign(
        new Member(),
        Builder<Member>()
          .firstname(payload.firstname)
          .lastname(payload.lastname)
          .mail(payload.mail)
          .iban(payload.iban)
          .phone(payload.phone)
          .gender(payload.gender)
          .birthdate(new Date(payload.birthdate))
          .address(payload.address)
          .active(payload.active)
          .codeActivation(payload.codeActivation)
          .created(new Date())
          .updated(new Date())
          .build(),
      );

      return await this.memberRepository.save(newMember);
    } catch (error) {
      this.logger.error(JSON.stringify(error));
      throw new MemberCreateException();
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const detail = await this.detail(id);

      await this.memberRepository.remove(detail);
    } catch (error) {
      this.logger.error(JSON.stringify(error));
      throw new MemberDeleteException();
    }
  }

  async detail(id: string): Promise<Member> {
    try {
      const result = await this.memberRepository.findOneBy({
        member_id: id,
      });

      if (!isNil(result)) return result;

      throw new MemberNotFoundException();
    } catch (errors) {
      this.logger.error(errors);
      throw new MemberNotFoundException();
    }
  }

  async getAll(): Promise<Member[]> {
    try {
      return await this.memberRepository.find();
    } catch (error) {
      this.logger.error(error);
      throw new MemberListException();
    }
  }

  async update(payload: MemberUpdatePayload): Promise<Member> {
    try {
      const detail = await this.memberRepository.findOneBy({
        member_id: payload.member_id,
      });

      detail.firstname = payload.firstname;
      detail.lastname = payload.lastname;
      detail.mail = payload.mail;
      detail.gender = payload.gender;
      detail.birthdate = new Date(payload.birthdate);
      detail.iban = payload.iban;
      detail.phone = payload.phone;
      detail.active = payload.active;
      detail.address = payload.address;
      detail.subscriptions = payload.subscriptions;

      /*
      for (const subscription of payload.subscriptions) {
        const memberSub = Object.assign(
          new MemberSubscription(),
          Builder<MemberSubscription>()
            .startDate(subscription.startDate)
            .active(subscription.active)
            .memberPlan(subscription.memberPlan),
        );



        detail.subscriptions.push(memberSub);
      }
      */

      return await this.memberRepository.save(detail);
    } catch (error) {
      this.logger.error(error);
      throw new MemberUpdateException();
    }
  }
}
