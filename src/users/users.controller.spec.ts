import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const newUserEntity: UserEntity = {id: 1, nome: "Teste", sexo: "F", data_de_nascimento: "2000-10-10", cpf: "00000000001", endereco: "Rua 10", pets: []}

const userEntityList: UserEntity[] = [
  newUserEntity
]

describe('UsersController', () => {
  let userController: UsersController;
  let usersService: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            save: jest.fn().mockResolvedValue(newUserEntity),
            findAll: jest.fn().mockResolvedValue(userEntityList),
            findOneOrFail: jest.fn().mockResolvedValue(newUserEntity),
            update: jest.fn().mockResolvedValue(newUserEntity),
            remove: jest.fn().mockResolvedValue(undefined),
          }
      }],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(usersService).toBeDefined();
  });
  
  describe('save', () => {
    it('should be save', async () => {
      const result = await userController.save(newUserEntity)
      expect(result).toEqual(newUserEntity)
    })
  });
  
  describe('findAll', () => {
    it('should be findAll', async () => {
      const result = await userController.findAll()
      expect(result).toEqual(userEntityList)
    })
  });

  describe('findOne', () => {
    it('should be findOne', async () => {
      const result = await userController.findOne(1)
      expect(result.id).toEqual(newUserEntity.id)
    })
  });

  describe('update', () => {
    it('should be update', async () => {
      let userUpdate = {nome: "Trocou nome"}
      const result = await userController.update(1, userUpdate)
      expect(result.id).toEqual(newUserEntity.id)
    })
  });

  describe('remove', () => {
    it('should be remove', async () => {
      const result = await userController.remove(1)
      expect(result).toBeUndefined()
    })
  });
})
