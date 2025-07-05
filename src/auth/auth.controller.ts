import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-guard.guard';
import { ValidateTokenDTO } from './dto/validateToken.dto';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
    constructor(private usersService:UsersService,
        private authService:AuthService
    ){}

    @Post('signup')
    @ApiOperation({ summary: 'Sign up a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully.', type: User })
    signUp(@Body() user: CreateUserDto): Promise<User> {
        return this.usersService.create(user)
    }

    @Post('login')
    @ApiOperation({ summary: 'login as existing user' })
    login(@Body() loginDetail: LoginDto): Promise<{ accessToken?: string, validate2fa?: string, message?: string }> {
        return this.authService.login(loginDetail)
    }

    @Post('enable-2fa')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    enableTwoFactorAuthentication(@Request() req:any): Promise<{ secret: string }> {
        return this.authService.enableTwoFactorAuthentication(req.user.userId);
    }

    @Post('validate-2fa')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    validateTwoFactorAuth(@Request() req: any, @Body() tokenDto:ValidateTokenDTO): Promise<{ verified: boolean }> {
        return this.authService.validateTwoFactorAuth(req.user.userId, tokenDto.token);
    }

    @Post('disable-2fa')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    disableTwoFactorAuth(@Request() req: any, @Body() tokenDto: ValidateTokenDTO): Promise<UpdateResult> {
        return this.authService.disable2Factor(req.user.userId);
    }

    @Get('profile')
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard('bearer'))
    getProfile(@Request() req: any){
        return {
            msg: 'Authenticated via api key',
            user: req.user
        }
    }
}
