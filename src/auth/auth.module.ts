import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstant } from 'src/config/configuration';
import { JwtStrategy } from './jwt-strategy';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
  imports: [
    UsersModule,
    ArtistModule ,
    JwtModule.register({
      secret: authConstant.secret,
      signOptions: { expiresIn: '1d' }
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
