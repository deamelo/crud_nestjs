import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let usersService = { findAll: () => ['test'] };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
    .overrideProvider(UsersService)
    .useValue(usersService)
    .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET users`, () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect({
        data: usersService.findAll(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
