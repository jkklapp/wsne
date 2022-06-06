import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
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

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('exists', () => {
    it('should return true if userName exists', async () => {
      const name = 'test';
      const result = await controller.exists({ name });
      expect(result).toEqual({ exists: true });
    });
    it('should return true if email exists', async () => {
      const email = 'test@test.com';
      const result = await controller.exists({ email });
      expect(result).toEqual({ exists: true });
    });
  });
});
