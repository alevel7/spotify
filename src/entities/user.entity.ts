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

    @Column()
    @Exclude()
    password: string

    @Column({nullable: true, type: 'text'})
    twoFactorSecret: string

    @Column({ default: false, type: 'boolean' })
    enable2Factor: boolean

    @Column({type: 'uuid', nullable: true})
    apiKey: string

    @OneToMany(() => Playlist, (playlist)=>playlist.user, {
        cascade:true
    })
    playlists: Playlist[]

}