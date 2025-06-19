import { IsArray, IsDateString, IsEmail, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}