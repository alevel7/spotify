import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, CanActivate } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource, { dataSourceOptions } from '../db/data-source';
import { DataSource, Repository } from 'typeorm';
import { Song } from '../src/entities/song.entity';
import { CreateSongDto } from 'src/songs/dto/create-song-dto';
import { createMock } from '@golevelup/ts-jest';
// import { JwtStrategy } from '../src/auth/strategy/jwt-strategy';
import { SongsService } from '../src/songs/songs.service';
import { SongsModule } from '../src/songs/songs.module';
import { AuthModule } from '../src/auth/auth.module';
import { JwtAuthGuard } from '../src/auth/guard/jwt-guard.guard';

export const clearDatabase = async (connection: DataSource) => {
    const entities = connection.entityMetadatas;

    for (const entity of entities) {
        const repository = connection.getRepository(entity.name);
        await repository.query(`TRUNCATE TABLE "${entity.tableName}" RESTART IDENTITY CASCADE;`);
    }
};
describe('SongController (e2e)', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    ...dataSourceOptions,
                    synchronize: true
                }),
                AppModule,
                SongsModule,
                AuthModule
            ],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue({
                canActivate: (context) => {
                    const req = context.switchToHttp().getRequest();
                    req.user = { userId: 1, email: 'admin@gmail.com' }; // mock user payload
                    return true;
                },
            })
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    beforeEach(async () => {
        await clearDatabase(dataSource);
    })

    const createSong = (createSongDto: CreateSongDto): Promise<Song> => {
        const newSong = new Song()
        newSong.title = createSongDto.title;
        newSong.duration = createSongDto.duration;
        newSong.releaseDate = createSongDto.releaseDate;
        newSong.artists = [];
        newSong.lyrics = createSongDto.lyrics;
        // newSong.playlist = createSongDto.playlist;
        const songRepo = app.get<Repository<Song>>('SongRepository');
        return songRepo.save(newSong)
    }

    it('/ (GET) songs should succeed for unauthorized user', async () => {
        const newSong = await createSong({
            title: "song1",
            duration: new Date(),
            releaseDate: new Date(),
            artists: [1],
            lyrics: "lyrics",
            playlist: 1
        });
        return request(app.getHttpServer())
        .get("/songs").query({ limit: 1, page: 1 })
        .expect(200)
        .then((result) => {
            expect(result.body.length).toBe(1);
            expect(result.body[0].title).toEqual(newSong.title)
        })
    });
});
