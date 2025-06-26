import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs'
import * as speakEasy from 'speakeasy';
import { JwtService } from '@nestjs/jwt';
import { ArtistService } from 'src/artist/artist.service';
import { JwtPayload, TwofactorPayload } from './types/jwtPayload.type';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private artistService: ArtistService
    ) { }

    async login(loginDetail: LoginDto): Promise<{ accessToken: string }> {
        const user = await this.userService.findByEmail(loginDetail.email)
        if (!user) {
            throw new UnauthorizedException('User not found')
        }
        const isValidPassword = await bcrypt.compare(loginDetail.password, user.password)
        if (isValidPassword) {
            const payload: JwtPayload = { email: user.email, sub: user.id }
            const artist = await this.artistService.findArtist(user.id)
            if (artist) {
                payload.artistId = artist.id
            }
            return {
                accessToken: this.jwtService.sign(payload)
            }
        } else {
            throw new UnauthorizedException('Invalid Credentials')
        }
    }
    async enableTwoFactorAuthentication(userId: number): Promise<TwofactorPayload> {
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        if (user.enable2Factor) {
            return { secret: user.twoFactorSecret };
        }
        const secret = speakEasy.generateSecret({ length: 20 });
        await this.userService.updateTwoFactorSecret(userId, secret.base32, true);
        return { secret: secret.base32 };
    }

    async validateTwoFactorAuth(userId: number, token: string): Promise<{ verified: boolean }> {
        const user = await this.userService.findById(userId);
        if (!user || !user.enable2Factor) {
            throw new UnauthorizedException('User not found or 2FA not enabled');
        }
        const isVerified = speakEasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token
        });
        return { verified: isVerified };
    }
}
