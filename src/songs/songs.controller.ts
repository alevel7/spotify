import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Controller('songs')
export class SongsController {

    constructor(
        private songService:SongsService,
    ) {
       
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
       return this.songService.findOne(id)
    }

    @Put(":id")
    update(
        @Param("id", ParseIntPipe) id: number, 
        @Body() song: UpdateSongDto){
        return this.songService.updateSong(id, song)
    }

    @Delete(":id")
    remove(@Param("id", ParseIntPipe) id: number){
        return this.songService.delete(id)
    }
}
