import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsDateString, IsEmail, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateUserDto {

    @ApiProperty({ example: 'John' })
    @IsString()
    @IsNotEmpty()
    firstName:string

    @ApiProperty({ example: 'Doe' })
    @IsNotEmpty()
    @IsString()
    lastName :string

    @ApiProperty({ example: 'john@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({ example: 'password123' })
    @IsNotEmpty()
    @IsString()
    password: string
}