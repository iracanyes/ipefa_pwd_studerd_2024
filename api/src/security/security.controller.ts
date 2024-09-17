/**
 * @ApiBearerAuth('access-token') indicate to Swagger which header contains the token
 * to access restricted area
 *
 */
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SecurityService } from '@security/service/security.service';
import { SignInPayload } from '@security/model/payloads/sign-in.payload';
import { SignupPayload } from '@security/model/payloads/signup.payload';
import { RefreshPayload } from '@security/model/payloads/refresh.payload';
import { Token, Credential } from '@security/model';
import { Public, User } from '@common/config';

@ApiBearerAuth('access-token')
@ApiTags('Account')
@Controller('account')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Public()
  @Post('signin')
  public signin(@Body() payload: SignInPayload) {
    return this.securityService.signIn(payload, false);
  }

  @Public()
  @Post('admin-signin')
  public adminSignin(@Body() payload: SignInPayload) {
    return this.securityService.signIn(payload, true);
  }

  @Public()
  @Post('signup')
  public signup(@Body() payload: SignupPayload) {
    return this.securityService.signup(payload);
  }

  @Public()
  @Post('refresh')
  public refresh(@Body() payload: RefreshPayload): Promise<Token | null> {
    return this.securityService.refresh(payload);
  }

  @Get('me')
  public me(@User() user: Credential) {
    return user;
  }

  @Delete('delete/:id')
  public delete(@Param('id') id: string): Promise<void> {
    return this.securityService.delete(id);
  }
}
