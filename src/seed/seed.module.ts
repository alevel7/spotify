import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Artist } from 'src/entities/artist.entity';
import { Playlist } from 'src/entities/playlist.entity';
import { Song } from 'src/entities/song.entity';

@Module({
   imports: [
      TypeOrmModule.forFeature([User, Artist,Playlist, Song])
    ],
  providers: [SeedService]
})
export class SeedModule {}
