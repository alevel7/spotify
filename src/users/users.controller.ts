import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard.guard';
import { Request } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';

@Controller('users')
export class UsersController {

    constructor(private userService:UsersService) {}

    @Get()
    @ApiBearerAuth('JWT-auth')
    @UseGuards(JwtAuthGuard)
    getUserDetail(@Request() req: {userId:number, email:string}):Promise<User | null> {
        return this.userService.findById(req.userId)
    }
}
