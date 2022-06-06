import { Injectable, Logger } from '@nestjs/common';
import { getByUserName, getByEmail } from './utils';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger(UsersService.name);

  async userNameExists(userName: string): Promise<boolean> {
    const user = await getByUserName(userName);
    return user !== null;
  }

  async userEmailExists(userEmail: string): Promise<boolean> {
    return getByEmail(userEmail)
      .then(() => true)
      .catch(() => false);
  }
}
