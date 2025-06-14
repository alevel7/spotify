import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connections';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from 'src/entities/song.entity';
import { Artist } from 'src/entities/artist.entity';
import { Playlist } from 'src/entities/playlist.entity';
import { User } from 'src/entities/user.entity';


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
