import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Playlist } from "./playlist.entity";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";


@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({
        description: 'The first name of the user',
        example: 'John',
        type: String
    })
    @Column()
    firstName: string

    @ApiProperty({
        description: 'The last name of the user',
        example: 'Doe',
        type: String
    })
    @Column()
    lastName: string

    @ApiProperty({
        description: 'The email of the user',
        example: 'yVz4b@example.com',
        type: String
    })
    @Column({unique: true})
    email:string

    @ApiProperty({
        description: 'The password of the user. This will be hashed before saving to the database',
        example: 'john_doe',
        type: String
    })
    @Column()
    @Exclude({toPlainOnly: false})
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