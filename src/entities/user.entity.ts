import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Playlist } from "./playlist.entity";
import { Exclude } from "class-transformer";


@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({unique: true})
    email:string

    @Column({ select: false })
    @Exclude()
    password: string

    @OneToMany(() => Playlist, (playlist)=>playlist.user, {
        cascade:true
    })
    playlists: Playlist[]

}