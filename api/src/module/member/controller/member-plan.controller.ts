import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MemberPlanService } from '@member/service';
import {
  MemberPlan,
  MemberPlanCreatePayload,
  MemberPlanUpdatePayload,
} from '@member/model';

@ApiBearerAuth('access-token')
@ApiTags("Members' Plan")
@Controller('member-plan')
export class MemberPlanController {
  constructor(private readonly memberPlanService: MemberPlanService) {}

  @Get('list')
  async findAll(): Promise<MemberPlan[]> {
    return this.memberPlanService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MemberPlan> {
    return this.memberPlanService.detail(id);
  }

  @Post('create')
  async create(@Body() payload: MemberPlanCreatePayload): Promise<MemberPlan> {
    return this.memberPlanService.create(payload);
  }

  @Put('update')
  async update(@Body() payload: MemberPlanUpdatePayload): Promise<MemberPlan> {
    return this.memberPlanService.update(payload);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.memberPlanService.delete(id);
  }
}
