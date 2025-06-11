import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connections';

const mockSongservice = {
  findAll: () => {
    return [{
      "title": "I hate this song u",
      "artists": [
        "celine dion", "micheal jackson"
      ],
      "releaseDate": "2025-05-05",
      "duration": "03:20"
    }]
  }
}
@Module({
  controllers: [SongsController],
  providers: [
    SongsService,
    {
      provide: "CONNECTION",
      useValue: connection
    }
    // {
    //   provide:SongsService,
    //   useClass:SongsService
    // },
    // {
    //   provide: SongsService,
    //   useValue: mockSongservice
    // }
  ]
})
export class SongsModule {}
