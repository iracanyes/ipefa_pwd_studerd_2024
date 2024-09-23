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
import { MemberService } from '@member/service';
import {
  Member,
  MemberCreatePayload,
  MemberUpdatePayload,
} from '@member/model';

@ApiBearerAuth('access-token')
@ApiTags('Members')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('list')
  async findAll(): Promise<Member[]> {
    return this.memberService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Member> {
    return this.memberService.detail(id);
  }

  @Post('create')
  async create(@Body() payload: MemberCreatePayload): Promise<Member> {
    return this.memberService.create(payload);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: MemberUpdatePayload,
  ): Promise<Member> {
    return this.memberService.update(payload);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.memberService.delete(id);
  }
}
