import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { Playlist } from '../entities/playlist.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('playlist')
@ApiBearerAuth('JWT-auth')
export class PlaylistController {
    constructor(
        private playlistService: PlaylistService
    ){}

    @Post()
    create(@Body() playlistDto: CreatePlaylistDto):Promise<Playlist> {
        return this.playlistService.create(playlistDto)
    }
}
