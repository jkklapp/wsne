import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserExistsResult } from './users.types';
import { ExistsUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('/exists')
  @HttpCode(202)
  public async exists(
    @Body() existsUserDto: ExistsUserDto,
  ): Promise<UserExistsResult> {
    const exists = await this.service.exists(existsUserDto);

    return {
      exists,
    };
  }
}
