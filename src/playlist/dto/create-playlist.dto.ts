import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePlaylistDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, {each: true})
    readonly songs;

    @IsNotEmpty()
    @IsNumber()
    readonly user: number

}