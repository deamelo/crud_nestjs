import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { UsersService } from '../src/users/users.service';
import { UserEntity } from 'users/entities/user.entity';

const newUserEntity: UserEntity = {id: 1, nome: "Teste", sexo: "F", data_de_nascimento: "2000-10-10", cpf: "00000000001", endereco: "Rua 10", pets: []}

const userEntityList: UserEntity[] = [
  newUserEntity
]

describe('User', () => {
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
