import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from '../entities/playlist.entity';
import { Song } from '../entities/song.entity';
import { User } from '../entities/user.entity';
import { In, Repository } from 'typeorm';
import { CreatePlaylistDto } from './dto/create-playlist.dto';

@Injectable()
export class PlaylistService {
    constructor(
        @InjectRepository(Playlist) private playListRepo:Repository<Playlist>,
        @InjectRepository(Song) private songRepo:Repository<Song>,
        @InjectRepository(User) private userRepo: Repository<User>,
    ){}

    async create(playlistDTO: CreatePlaylistDto):Promise<Playlist>{
        const playlist = new Playlist()
        playlist.name = playlistDTO.name

        // songs will be the array of ids we are getting from dto
        const songs = await this.songRepo.findBy({ 
            id: In(playlistDTO.songs) 
        })
        playlist.songs = songs

        // user will be the user we are getting from the request
        // when we implement the authentication, this will be the logged in user
        const user = await this.userRepo.findOneBy({ id: playlistDTO.user })
        if (user) playlist.user = user

        return this.playListRepo.save(playlist)
    }
}
