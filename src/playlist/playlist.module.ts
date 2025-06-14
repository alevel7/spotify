import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from 'src/entities/playlist.entity';
import { Song } from 'src/entities/song.entity';
import { User } from 'src/entities/user.entity';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { Artist } from 'src/entities/artist.entity';

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
