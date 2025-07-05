import { Test, TestingModule } from '@nestjs/testing';
import { ArtistService } from './artist.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Artist } from '../entities/artist.entity';

describe('ArtistService', () => {
  let service: ArtistService;

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
        ArtistService,
        {
          provide: getRepositoryToken(Artist),
          useValue: repository
        }
      ],
    }).compile();

    service = module.get<ArtistService>(ArtistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
