import { Injectable, Logger } from '@nestjs/common';
import { UserExistsPayload } from './user.types';
import { getByUserName, getByEmail } from './utils';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger(UsersService.name);

  async exists({ name, email }: UserExistsPayload): Promise<boolean> {
    if (email) {
      return getByEmail(email)
        .then(() => true)
        .catch(() => false);
    } else if (name) {
      const user = await getByUserName(name);
      return user !== null && user !== undefined && user.displayName == name;
    }
    return false;
  }
}
