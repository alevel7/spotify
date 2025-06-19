import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { ArtistService } from 'src/artist/artist.service';
import { JwtPayload } from './types/jwtPayload.type';

@Injectable()
export class AuthService {

    constructor(private userService:UsersService,
         private jwtService: JwtService,
         private artistService:ArtistService
    ){}

    async login(loginDetail:LoginDto):Promise<{accessToken: string}>{
        const user = await this.userService.findOne(loginDetail.email)
        if (!user) {
            throw new UnauthorizedException('User not found')
        }
        const isValidPassword = await bcrypt.compare(loginDetail.password, user.password)
        if (isValidPassword) {
            const payload: JwtPayload = {email:user.email, sub :user.id}
            const artist = await this.artistService.findArtist(user.id)
            if (artist) {
                payload.artistId = artist.id
            }
            return {
                accessToken: this.jwtService.sign(payload)
            }
        }else{
            throw new UnauthorizedException('Invalid Credentials')  
        }
    }
}
