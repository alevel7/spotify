import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { ArtistService } from '../artist/artist.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Artist } from '../entities/artist.entity';
import { LoginDto } from './dto/login.dto';
import { hash } from 'crypto';
import { createMock } from '@golevelup/ts-jest';

describe('AuthService', () => {
  let service: AuthService;

  jest.mock('bcryptjs', () => ({
    compare: jest.fn(),
  }));

  const repository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }

  const mockUsersService = createMock<UsersService>();
  const mockArtistService = createMock<ArtistService>();
  const mockJwtService = createMock<JwtService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService
        },
        {
          provide: UsersService,
          useValue: mockUsersService
        },
        {
          provide: ArtistService,
          useValue: mockArtistService
        },
        {
          provide: getRepositoryToken(Artist),
          useValue: repository
        },
        {
          provide: getRepositoryToken(User),
          useValue: repository
        },
        {
          provide: getRepositoryToken(Artist),
          useValue: repository
        }
      ],
    })
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("/login api", () => {

    it('should throw an error is login user not found', async () => {
      const mockUser: LoginDto = {
        email: 'Taiwo@gmail.com',
        password: "12345"
      }
      mockUsersService.findByEmail = jest.fn().mockResolvedValue(null);
      expect(service.login(mockUser)).rejects.toThrow('User not found');
    })
    it('should throw an invalid credential if login user password fails', async () => {
      const mockUser: LoginDto = {
        email: 'Taiwo@gmail.com',
        password: "12345"
      }
      mockUsersService.findByEmail = jest.fn().mockResolvedValue(
        {
          id: 1,
          firstName: 'Taiwo',
          lastName: 'Kazeem',
          email: 'Taiwo@gmail.com',
          password: "12345",
          enable2Factor: false,
          twoFactorSecret: null,
          apiKey: null
        }
      );
      jest.spyOn(bcrypt, 'compare',).mockImplementation((pwd, hash) => Promise.resolve(false))
      expect(service.login(mockUser)).rejects.toThrow('Invalid Credentials');
    })

    it('should return access token if login is successful and 2Fa disabled', async () => {
      const mockUser: LoginDto = {
        email: 'Taiwo@gmail.com',
        password: "12345"
      }
      mockUsersService.findByEmail = jest.fn().mockResolvedValue(
        {
          id: 1,
          firstName: 'Taiwo',
          lastName: 'Kazeem',
          email: 'Taiwo@gmail.com',
          password: "12345",
          enable2Factor: false,
          twoFactorSecret: null,
          apiKey: null
        }
      );
      jest.spyOn(bcrypt, 'compare',).mockImplementation((pwd, hash) => Promise.resolve(true))
      mockArtistService.findArtist = jest.fn().mockResolvedValue(null);
      mockJwtService.sign = jest.fn().mockReturnValue('mockedAccessToken');
      const result = await service.login(mockUser);
      expect(result.accessToken).toEqual('mockedAccessToken');
    })
    it('should return success where accessToken is undefined if login is successful and 2Fa enabled', async () => {
      const mockUser: LoginDto = {
        email: 'Taiwo@gmail.com',
        password: "12345"
      }
      mockUsersService.findByEmail = jest.fn().mockResolvedValue(
        {
          id: 1,
          firstName: 'Taiwo',
          lastName: 'Kazeem',
          email: 'Taiwo@gmail.com',
          password: "12345",
          enable2Factor: true,
          twoFactorSecret: null,
          apiKey: null
        }
      );
      jest.spyOn(bcrypt, 'compare',).mockImplementation((pwd, hash) => Promise.resolve(true))
      mockArtistService.findArtist = jest.fn().mockResolvedValue(null);
      const result = await service.login(mockUser);
      expect(result.accessToken).toEqual(undefined);
      expect(result.message).toBeDefined();
    })
  })

});
