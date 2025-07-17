import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from '../common/constants/connections';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from '../entities/song.entity';
import { Artist } from '../entities/artist.entity';
import { Playlist } from '../entities/playlist.entity';
import { User } from '../entities/user.entity';
import { JwtStrategy } from '../auth/strategy/jwt-strategy';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, Playlist, Song, Artist
    ])
  ],
  controllers: [
    SongsController,
  ],
  providers: [
    SongsService,
    JwtStrategy
    // {
    //   provide: "CONNECTION",
    //   useValue: connection
    // }
    // {
    //   provide:SongsService,
    //   useClass:SongsService
    // },
    // {
    //   provide: SongsService,
    //   useValue: mockSongservice
    // }
  ]
})
export class SongsModule { }
