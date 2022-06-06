import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

jest.mock('./utils', () => {
  return {
    getByUserName: jest
      .fn()
      .mockResolvedValue({ displayName: 'test', email: 'test@test.com' }),
    getByEmail: jest
      .fn()
      .mockResolvedValue({ displayName: 'test', email: 'test@test.com' }),
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

  describe('exists', () => {
    it('should return true if user name exists', async () => {
      const name = 'test';

      const result = await service.exists({ name });
      expect(result).toEqual(true);
    });
    it('should return true if email exists', async () => {
      const email = 'test@test.com';

      const result = await service.exists({ email });
      expect(result).toEqual(true);
    });
  });
});
