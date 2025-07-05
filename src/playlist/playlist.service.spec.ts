import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistService } from './playlist.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Playlist } from '../entities/playlist.entity';
import { Song } from '../entities/song.entity';
import { User } from '../entities/user.entity';

describe('PlaylistService', () => {
  let service: PlaylistService;


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
        PlaylistService,
        {
          provide: getRepositoryToken(Song),
          useValue: repository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: repository,
        },
        {
          provide: getRepositoryToken(Playlist),
          useValue: repository,
        }
      ],
    }).compile();

    service = module.get<PlaylistService>(PlaylistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
