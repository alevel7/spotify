import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from 'src/entities/song.entity';
import { In, Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song-dto';
import { Artist } from 'src/entities/artist.entity';
import { Playlist } from 'src/entities/playlist.entity';

@Injectable()
export class SongsService {

    constructor(
        @InjectRepository(Song) private songRepo: Repository<Song>,
        @InjectRepository(Artist) private artistRepo: Repository<Artist>,
        @InjectRepository(Playlist) private playlistRepo: Repository<Playlist>,
    ) { }

    async findOne(id: number): Promise<Song | null> {
        return this.songRepo.findOne({
            where: { id },
            relations: {
                artists: true,
                playlist: true
            }
        })
    }

    async create(song: CreateSongDto):Promise<Song> {
        const nSong = new Song()
        nSong.duration = song.duration
        nSong.releaseDate = song.releaseDate
        const artists = await this.artistRepo.find({ where: { id: In(song.artists) } })
        nSong.artists = artists
        nSong.lyrics = "some random lyrics"
        const playlist = await this.playlistRepo.findOneBy({
            id: song.playlist
        })
        if (playlist) nSong.playlist = playlist

        return this.songRepo.save(nSong)
    }
    async findAll(): Promise<Song[]> {
        return this.songRepo.find({
            relations: {
                artists: true,
                playlist: true
            }
        })
    }
}
