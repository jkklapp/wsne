import { Body, Controller, Get } from '@nestjs/common';
import { UserExistsPayload, UserExistsResult } from './user.types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('/exists')
  public async userNameExists(
    @Body() { userName, userEmail }: UserExistsPayload,
  ): Promise<UserExistsResult> {
    let exists = false;
    if (userName) {
      exists = await this.service.userNameExists(userName);
    }
    if (userEmail) {
      exists = await this.service.userEmailExists(userEmail);
    }
    return {
      exists,
    };
  }
}
