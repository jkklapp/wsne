import { Injectable, Logger } from '@nestjs/common';
import { UserExistsPayload } from './user.types';
import { getByUserName, getByEmail } from './utils';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger(UsersService.name);

  async exists({ name, email }: UserExistsPayload): Promise<boolean> {
    if (email) {
      const user = await getByEmail(email);
      return user !== null && user !== undefined && user.email == email;
    } else if (name) {
      const user = await getByUserName(name);
      return user !== null && user !== undefined && user.displayName == name;
    }
    return false;
  }
}
