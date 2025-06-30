import { EntityManager } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { faker } from "@faker-js/faker/.";
import { v4 as uuid } from "uuid";
import { User } from "src/entities/user.entity";
import { Playlist } from "src/entities/playlist.entity";
import { Artist } from "src/entities/artist.entity";


export const seedData = async (manager:EntityManager): Promise<void> => {
    await seedUser()
    await seedArtists();
    await seedPlaylists();

    async function seedUser() {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password', salt);
        const user = new User();
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email();
        user.password = hashedPassword;
        user.apiKey = uuid();

        await manager.getRepository(User).save(user);
    }

    async function seedArtists() {
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
        await manager.getRepository(User).save(user);
        await manager.getRepository(Artist).save(artist);
    }
    async function seedPlaylists() {
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
        await manager.getRepository(Playlist).save(playList);
    }
}