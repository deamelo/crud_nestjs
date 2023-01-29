import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

const newUserEntity: UserEntity = {id: 1, nome: "Teste", sexo: "F", data_de_nascimento: "2000-10-10", cpf: "11111111111", endereco: "Rua 10", pets: []}

const userEntityList: UserEntity[] = [
  newUserEntity
]


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
            save: jest.fn().mockReturnValueOnce(newUserEntity),
            create: jest.fn().mockResolvedValueOnce(newUserEntity),
            findAll: jest.fn().mockResolvedValue(userEntityList),
            findOneOrFail: jest.fn().mockResolvedValue(newUserEntity),
            update: jest.fn().mockResolvedValue(newUserEntity),
            remove: jest.fn().mockResolvedValue(undefined),
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

  describe('save e create', () => {
    it('save e create', async () => {
      jest.spyOn(userRepository, 'create')
      jest.spyOn(userRepository, 'save')

      const result = await userService.save(newUserEntity);
      expect(result).toBeDefined()
    })   
  })

  // describe('findAll', () => {
  //   it('should be findAll', async () => {
  //     const result = await userService.findAll();
  //     expect(result).toEqual(userEntityList)
  //   })   
  // })
  
  // describe('findOne', () => {
  //   it('should be findOne', async () => {
  //     jest.spyOn(userRepository, 'findOneOrFail')      
  //     const result = await userService.findOneOrFail(newUserEntity.id);
  //     expect(result).toBeDefined()
  //   })   
  // })
    
  // describe('update', () => {
  //   it('should be update', async () => {
  //     let userUpdate = {nome: "Trocou nome"}
  //     jest.spyOn(userRepository, 'update')      
  //     const result = await userService.update(newUserEntity.id, userUpdate);
  //     expect(result).toBeDefined()
  //   })   
  // })

  // describe('remove', () => {
  //   it('should be remove', async () => {
  //     jest.spyOn(userRepository, 'remove')      
  //     const result = await userService.remove(newUserEntity.id);
  //     expect(result).toBeDefined()
  //   })   
  // })
});
