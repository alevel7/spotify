import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';

@Controller('songs')
export class SongsController {

    constructor(
        private songService:SongsService
    ) {}

    @Post()
    createSong(@Body() newSong: CreateSongDto) {
        return this.songService.create(newSong)
    }

    @Get()
    findAll() {
        return this.songService.findAll()
    }

    @Get(":id")
    findOne(){
        return "fetching one"
    }

    @Put(":id")
    update(){
        return "Updating one"
    }

    @Delete(":id")
    remove(){
        return "Removing one"
    }
}
