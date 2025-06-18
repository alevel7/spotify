import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private usersService:UsersService){}

    @Post('signup')
    signUp(@Body() user: CreateUserDto): Promise<User> {
        return this.usersService.create(user)
    }
}
