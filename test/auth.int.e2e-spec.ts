import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { Connection, DataSource, getConnection, Repository,  } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource, { dataSourceOptions } from '../db/data-source';
import { AuthModule } from '../src/auth/auth.module';
import { User } from 'src/entities/user.entity';

export const clearDatabase = async (connection: DataSource) => {
  const entities = connection.entityMetadatas;

  for (const entity of entities) {
    const repository = connection.getRepository(entity.name);
    await repository.query(`TRUNCATE TABLE "${entity.tableName}" RESTART IDENTITY CASCADE;`);
  }
};

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;
  let userRepo: Repository<User>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(dataSourceOptions),
        AppModule,
        AuthModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepo = moduleFixture.get('UserRepository');
    await app.init();
  });

  afterAll(async () => {
    // await dataSource.destroy();
    // await app.close();
  });

  beforeEach(async () => {
    await clearDatabase(dataSource);
    // await userRepo.clear();
  });


  it('/auth/login should signup new user (POST)', () => {
    const user = {
      firstName: "Taiwo",
      lastName: "kazeem",
      email: "Taiwo@gmail.com",
      password: "12345",
      phone: "08056965067"
    }
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(user)
      .expect(201)
    .expect('Hello World!');
  });


  it('/auth/login should login user if user exists (POST)', () => {
    const user = {
      email: "Taiwo@gmail.com",
      password: "12345"
    }
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(user)
      .expect(201)
      // .expect('Hello World!');
  });
});
