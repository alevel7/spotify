import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private usersService:UsersService,
        private authService:AuthService
    ){}

    @Post('signup')
    signUp(@Body() user: CreateUserDto): Promise<User> {
        return this.usersService.create(user)
    }

    @Post('login')
    login(@Body() loginDetail: LoginDto): Promise<{accessToken:string}> {
        return this.authService.login(loginDetail)
    }
}
