import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Artist } from '../entities/artist.entity';
import { Playlist } from '../entities/playlist.entity';
import { Song } from '../entities/song.entity';

@Module({
   imports: [
      TypeOrmModule.forFeature([User, Artist,Playlist, Song])
    ],
  providers: [SeedService]
})
export class SeedModule {}
