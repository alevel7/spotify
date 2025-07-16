import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateSongDto {

    @IsString()
    @IsNotEmpty()
    title:string

    @IsNotEmpty()
    @IsArray()
    @IsNumber({},{each:true})
    artists :number[]

    @IsNotEmpty()
    @IsDateString()
    releaseDate: Date

    @IsString()
    @IsOptional()
    lyrics: string

    @IsNotEmpty()
    @IsMilitaryTime()
    duration: Date

    @IsNotEmpty()
    @IsNumber()
    playlist: number
}