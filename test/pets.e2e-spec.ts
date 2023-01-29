import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PetsService } from 'pets/pets.service';
import { PetsModule } from 'pets/pets.module';
import { UsersModule } from 'users/users.module';

describe('Pets', () => {
  let app: INestApplication;
  let petsService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PetsModule, UsersModule],
    })
      .overrideProvider(PetsService)
      .useValue(petsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET pets`, () => {
    return request(app.getHttpServer())
      .get('/pets')
      .expect(200)
      .expect({
        data: petsService.findAll(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});