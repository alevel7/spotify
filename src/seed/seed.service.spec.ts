import { Test, TestingModule } from '@nestjs/testing';
import { SeedService } from './seed.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Artist } from '../entities/artist.entity';
import { User } from '../entities/user.entity';
import { Playlist } from '../entities/playlist.entity';
import { Song } from '../entities/song.entity';

describe('SeedService', () => {
  let service: SeedService;

  const repository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeedService,
        {
          provide: getRepositoryToken(Artist),
          useValue: repository
        },
        {
          provide: getRepositoryToken(User),
          useValue: repository
        },
        {
          provide: getRepositoryToken(Playlist),
          useValue: repository
        },
        {
          provide: getRepositoryToken(Song),
          useValue: repository
        },
      ],
    }).compile();

    service = module.get<SeedService>(SeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
