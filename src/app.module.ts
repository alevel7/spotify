import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistModule } from './playlist/playlist.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArtistModule } from './artist/artist.module';
// import { typeOrmAsyncConfig } from '../db/data-source';
import { ConfigModule } from '@nestjs/config';
import { SeedModule } from './seed/seed.module';
import configuration from './config/configuration';
import { validate } from '../env.validation';
import { dataSourceOptions } from '../db/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      ],
      // load: [configuration],
      validate: validate
    }),
    SongsModule,
    PlaylistModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UsersModule,
    ArtistModule,
    SeedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumeer: MiddlewareConsumer) {
    consumeer.apply(LoggerMiddleware).forRoutes('songs');
  }
}
