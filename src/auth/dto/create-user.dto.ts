import { IsArray, IsDateString, IsEmail, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    firstName:string

    @IsNotEmpty()
    @IsString()
    lastName :string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    phone: string
}