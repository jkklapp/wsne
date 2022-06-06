import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

jest.mock('./utils', () => {
  return {
    getByUserName: jest
      .fn()
      .mockResolvedValue({ userName: 'test', email: 'test@test.com' }),
    getByEmail: jest
      .fn()
      .mockResolvedValue({ userName: 'test', email: 'test@test.com' }),
  };
});

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('userNameExists', () => {
    it('should return true if userName exists', async () => {
      const userName = 'test';

      const result = await service.userNameExists(userName);
      expect(result).toEqual(true);
    });
  });
});
