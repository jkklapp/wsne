import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserExistsPayload, UserExistsResult } from './user.types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('/exists')
  @HttpCode(204)
  public async userNameExists(
    @Body() { name, email }: UserExistsPayload,
  ): Promise<UserExistsResult> {
    let exists = false;
    if (name) {
      exists = await this.service.userNameExists(name);
    }
    if (email) {
      exists = await this.service.userEmailExists(email);
    }

    return {
      exists,
    };
  }
}
