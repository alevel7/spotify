import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../entities/artist.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Artist])
  ],
  providers: [ArtistService],
  exports:[ArtistService]
})
export class ArtistModule {}
