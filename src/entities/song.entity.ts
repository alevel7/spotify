import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Playlist } from "./playlist.entity"
import { Artist } from "./artist.entity"


@Entity('songs')
export class Song {
    @PrimaryGeneratedColumn()
    id: number

    @Column({default:"some random title"})
    title: string

    @Column('date')
    releaseDate: Date

    @Column('time')
    duration: Date

    @Column('text')
    lyrics: string

    @ManyToMany(() => Artist, artist => artist.songs, {
        cascade: true
    })
    @JoinTable({name: 'song_artists'})
    artists: Artist[]

    @ManyToOne(() => Playlist, (playlist) => playlist.songs)
    playlist: Playlist
}