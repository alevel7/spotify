import { Test, TestingModule } from '@nestjs/testing';
import { SongsService } from './songs.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Song } from '../entities/song.entity';
import { Playlist } from '../entities/playlist.entity';
import { Artist } from '../entities/artist.entity';

describe('SongsService', () => {
  let songService: SongsService;

  // const mockSongsService = {
  //   create: jest.fn(),
  //   findAll: jest.fn(),
  //   findOne: jest.fn(),
  //   updateSong: jest.fn(),
  //   delete: jest.fn(),
  // };


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
        SongsService,
        {
          provide: getRepositoryToken(Song),
          useValue: repository,
        },
        {
          provide: getRepositoryToken(Artist),
          useValue: repository,
        },
        {
          provide: getRepositoryToken(Playlist),
          useValue: repository,
        }
      ],
    })
    .compile();

    songService = module.get<SongsService>(SongsService);

  });

  it('should be defined', () => {
    expect(songService).toBeDefined();
  });
});
