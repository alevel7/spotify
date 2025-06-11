import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { Connection } from 'src/common/constants/connections';

@Controller('songs')
export class SongsController {

    constructor(
        private songService:SongsService,
        @Inject('CONNECTION') private connection:Connection
    ) {
        console.log(this.connection)
    }

    @Post()
    createSong(@Body() newSong: CreateSongDto) {
        return this.songService.create(newSong)
    }

    @Get()
    findAll() {
        try {
            return this.songService.findAll()
        } catch (error) {
            throw new HttpException("Error fetching songs", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        
    }

    @Get(":id")
    findOne(@Param("id",ParseIntPipe) id: number) {
        return `fetching one with id ${typeof id}`;
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
