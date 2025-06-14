import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Song } from "./song.entity";


@Entity('playlists')
export class Playlist {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Song, (song) => song.playlist)
    songs: Song[]

    @ManyToOne(() => User, (user) => user.playlists)
    user: User
}