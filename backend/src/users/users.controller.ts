import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserExistsPayload, UserExistsResult } from './user.types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('/exists')
  @HttpCode(202)
  public async exists(
    @Body() payload: UserExistsPayload,
  ): Promise<UserExistsResult> {
    const exists = await this.service.exists(payload);

    return {
      exists,
    };
  }
}
