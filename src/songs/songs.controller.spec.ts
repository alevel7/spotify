import { Test, TestingModule } from '@nestjs/testing';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song.dto';

describe('SongsController', () => {
  let controller: SongsController;

  const mockSongsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    updateSong: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SongsController],
      providers: [SongsService],
    })
      .overrideProvider(SongsService)
      .useValue(mockSongsService)
      .compile();

    controller = module.get<SongsController>(SongsController);
  });

  const newSong = new CreateSongDto();
  newSong.duration = new Date();
  newSong.artists = [1];
  newSong.releaseDate = new Date();
  newSong.lyrics = "some random lyrics";
  newSong.title = "some random title";
  newSong.playlist = 1;

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("should create a new song", async () => {
    mockSongsService.create.mockResolvedValue(newSong);
    const result = await controller.createSong(newSong);
    expect(result).toEqual(newSong)
  })

  it("should fetch all songs", async () => {
    const allSongs = Array.from({ length: 10 }).map((_, index) => ({ ...newSong, id: index }));
    mockSongsService.findAll.mockImplementation((limit, page) => {
      return allSongs
    });;
    const result = await controller.findAll(10, 1);
    expect(result.length).toBe(allSongs.length)
    expect(mockSongsService.findAll).toHaveBeenCalledWith(1, 10)
  })

  it("should update a song", async () => {
    mockSongsService.updateSong.mockImplementation((id: number, song: UpdateSongDto) => {
      return Promise.resolve({ ...song })
    });
    const result = await controller.update(1, newSong);
    expect(result).toEqual(newSong)
    expect(mockSongsService.updateSong).toHaveBeenCalledWith(1, newSong)
  })

});
