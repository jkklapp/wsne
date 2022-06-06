import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
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

  describe('userNameExists', () => {
    it('should return true if userName exists', async () => {
      const userName = 'test';
      const userEmail = 'test@email.com';
      const result = await controller.userNameExists({ userName, userEmail });
      expect(result).toEqual({ exists: true });
    });
  });
});
