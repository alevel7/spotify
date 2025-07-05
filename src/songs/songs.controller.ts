import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-guard.guard';
import { ArtistJwtGuardGuard } from '../auth/guard/artist-jwt-guard.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('songs')
export class SongsController {

    constructor(
        private songService:SongsService,
    ) {
       
    }

    @Post()
    @ApiBearerAuth('JWT-auth')
    @UseGuards(ArtistJwtGuardGuard)
    createSong(@Body() newSong: CreateSongDto) {
        return this.songService.create(newSong)
    }

    @Get()
    @ApiBearerAuth('JWT-auth')
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
    @ApiBearerAuth('JWT-auth')
    findOne(@Param("id",ParseIntPipe) id: number) {
       return this.songService.findOne(id)
    }

    @Put(":id")
    @ApiBearerAuth('JWT-auth')
    update(
        @Param("id", ParseIntPipe) id: number, 
        @Body() song: UpdateSongDto){
        return this.songService.updateSong(id, song)
    }

    @Delete(":id")
    @ApiBearerAuth('JWT-auth')
    remove(@Param("id", ParseIntPipe) id: number){
        return this.songService.delete(id)
    }
}
