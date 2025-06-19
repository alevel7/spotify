import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from 'src/entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
    constructor(
        @InjectRepository(Artist) private artistRepo: Repository<Artist>,
    ){}

    findArtist(userId: number): Promise<Artist | null> {
        return this.artistRepo.findOneBy({ user: { id: userId } })
    }
}
