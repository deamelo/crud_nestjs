import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from 'users/entities/user.entity';
import { PetEntity } from './entities/pet.entity';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';


const newUser: UserEntity = {id: 1, nome: "Teste", sexo: "F", data_de_nascimento: "2000-10-10", cpf: "00000000001", endereco: "Rua 10", pets: []}

const newPetEntity: PetEntity = {id: 1, nome: "Teste", especie: "Felina", raca: "SRD", sexo: "F", user: newUser}

const petEntityList: PetEntity[] = [
  newPetEntity
]

describe('UsersController', () => {
  let petsController: PetsController;
  let petsService: PetsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetsController],
      providers: [
        {
          provide: PetsService,
          useValue: {
            save: jest.fn().mockResolvedValue(newPetEntity),
            findAll: jest.fn().mockResolvedValue(petEntityList),
            findOneOrFail: jest.fn().mockResolvedValue(newPetEntity),
            update: jest.fn().mockResolvedValue(newPetEntity),
            remove: jest.fn().mockResolvedValue(undefined),
          }
      }],
    }).compile();

    petsController = module.get<PetsController>(PetsController);
    petsService = module.get<PetsService>(PetsService);
  });

  it('should be defined', () => {
    expect(petsController).toBeDefined();
    expect(petsService).toBeDefined();
  });
  
  describe('save', () => {
    it('should be save', async () => {
      const result = await petsController.save(newPetEntity)
      expect(result).toEqual(newPetEntity)
    })
  });
  
  describe('findAll', () => {
    it('should be findAll', async () => {
      const result = await petsController.findAll()
      expect(result).toEqual(petEntityList)
    })
  });

  describe('findOne', () => {
    it('should be findOne', async () => {
      const result = await petsController.findOne(1)
      expect(result.id).toEqual(newPetEntity.id)
    })
  });

  describe('update', () => {
    it('should be update', async () => {
      let userUpdate = {nome: "Trocou nome"}
      const result = await petsController.update(1, userUpdate)
      expect(result.id).toEqual(newPetEntity.id)
    })
  });

  describe('remove', () => {
    it('should be remove', async () => {
      const result = await petsController.remove(1)
      expect(result).toBeUndefined()
    })
  });
})
