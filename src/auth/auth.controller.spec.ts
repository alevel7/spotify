import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
    validateUser: jest.fn(),
    getUserProfile: jest.fn(),
    updateUserProfile: jest.fn(),
    deleteUser: jest.fn(),
  };
  const mockUsersService = createMock<UsersService>()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, {
        provide:UsersService,
        useValue: mockUsersService,
      }],
    })
    .overrideProvider(AuthService)
      .useValue(mockAuthService)
      // .overrideProvider(UsersService)
      // .useValue(mockUsersService)
    .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should fail with invalid payload value', async() => {
    const userDto = { firstName: 'Test', lastName: 'User', email: 'testuser', password: 'testpass' };
    mockUsersService.create = jest.fn().mockResolvedValue(userDto);
    const response = await controller.signUp(userDto);
    expect(response).toEqual(userDto);
  })
});
