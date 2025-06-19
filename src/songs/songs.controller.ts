import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard.guard';
import { ArtistJwtGuardGuard } from 'src/auth/guard/artist-jwt-guard.guard';

@Controller('songs')
export class SongsController {

    constructor(
        private songService:SongsService,
    ) {
       
    }

    @Post()
    @UseGuards(ArtistJwtGuardGuard)
    createSong(@Body() newSong: CreateSongDto) {
        return this.songService.create(newSong)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Query("limit", ParseIntPipe) limit: number, 
        @Query("page", ParseIntPipe) page: number) {
        try {
            return this.songService.findAll(page, limit)
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
