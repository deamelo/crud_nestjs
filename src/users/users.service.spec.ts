import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { create } from 'domain';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserFactory } from './users.factory';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let userService: UsersService;
  let userRepository: Repository<UserEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            save: jest.fn(),
            create: jest.fn()
          }
        }
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('save', () => {
    it('salvar novo user', async () => {
      const data: CreateUserDto = new UserFactory
      // {
      //   nome: "teste",
      //   sexo: "F",
      //   data_de_nascimento: "2000-05-05",
      //   cpf: "111.222.333-44",
      //   endereco: "aqui",
      // }

      jest.spyOn(userRepository, 'create').mockReturnValueOnce(data)
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(data)

      const result = await userService.save(data);
      expect(result).toBeDefined()
    })   
  })
});
