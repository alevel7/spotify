import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from '../entities/playlist.entity';
import { Song } from '../entities/song.entity';
import { User } from '../entities/user.entity';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { Artist } from '../entities/artist.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([
            User,Playlist,Song,Artist
        ])
    ],
    controllers: [PlaylistController],
    providers: [PlaylistService]
})
export class PlaylistModule {

}
