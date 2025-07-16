import { Test, TestingModule } from '@nestjs/testing';
import { SongsService } from './songs.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Song } from '../entities/song.entity';
import { Playlist } from '../entities/playlist.entity';
import { Artist } from '../entities/artist.entity';
import { Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song-dto';

describe('SongsService', () => {
  let songService: SongsService;
  let songRepo: Repository<Song>;

  const newSong = new CreateSongDto();
  newSong.duration = new Date();
  newSong.artists = [1];
  newSong.releaseDate = new Date();
  newSong.lyrics = "some random lyrics";
  newSong.title = "some random title";
  newSong.playlist = 1;


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
    songRepo = module.get<Repository<Song>>(getRepositoryToken(Song));

  });

  it('should be defined', () => {
    expect(songService).toBeDefined();
  });
  describe("find one sond by id", () => {
    it("should return a song", async () => {
      const aSong = new Song()
      const findOneSpy = jest.spyOn(songRepo, "findOne")
      findOneSpy.mockResolvedValue(aSong);
      const song = await songService.findOne(1);
      expect(song).toBeDefined();
      expect(song).toEqual(aSong);
    })
  })
});
