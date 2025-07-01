import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsDateString, IsEmail, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class LoginDto {

    @ApiProperty({ example: 'alevel7@gmail.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({ example: 'password123' })
    @IsNotEmpty()
    @IsString()
    password: string
}