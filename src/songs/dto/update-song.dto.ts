import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateSongDto {

    @IsString()
    @IsOptional()
    readonly title:string

    @IsOptional()
    @IsArray()
    @IsNumber({},{each:true})
    readonly artists :number[]

    @IsOptional()
    @IsDateString()
    readonly releaseDate: Date

    @IsString()
    @IsOptional()
    readonly lyrics: string

    @IsOptional()
    @IsMilitaryTime()
    readonly duration: Date

    @IsOptional()
    @IsNumber()
    readonly playlist: number
}