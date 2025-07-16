import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { v4 as uuid } from "uuid";
import { Repository } from 'typeorm';
import { Artist } from '../entities/artist.entity';
import { Playlist } from '../entities/playlist.entity';
import { faker } from '@faker-js/faker';
import { Song } from '../entities/song.entity';

@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Artist)
        private readonly artistRepository: Repository<Artist>,
        @InjectRepository(Playlist)
        private readonly playlistRepository: Repository<Playlist>,
        @InjectRepository(Song)
        private readonly songRepository: Repository<Song>,
    ) { }

    async run() {
        // Clear existing data
        // await this.artistRepository.clear();
        // await this.userRepository.clear();
        // await this.playlistRepository.clear();
        // await this.songRepository.clear();
        // Seed new data
        await this.seedUser()
        await this.seedArtists();
        await this.seedPlaylists();
    }
    async seedUser() {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password', salt);
        const user = new User();
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email();
        user.password = hashedPassword;
        user.apiKey = uuid();

        await this.userRepository.save(user);
    }

    async seedArtists() {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password', salt);
        const user = new User();
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email();
        user.password = hashedPassword;
        user.apiKey = uuid();

        const artist = new Artist();
        artist.user = user;
        artist.name = user.firstName;
        await this.userRepository.save(user);
        await this.artistRepository.save(artist);
    }
    async seedPlaylists() {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password', salt);
        const user = new User();
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email();
        user.password = hashedPassword;
        user.apiKey = uuid();

        const playList = new Playlist();
        playList.name = faker.music.songName();
        playList.user = user;
        await this.userRepository.save(user);
        await this.playlistRepository.save(playList);
    }
}
