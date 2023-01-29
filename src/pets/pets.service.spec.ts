import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { PetEntity } from './entities/pet.entity';
import { PetsService } from './pets.service';

const newUser: UserEntity = {id: 1, nome: "Teste", sexo: "F", data_de_nascimento: "2000-10-10", cpf: "00000000001", endereco: "Rua 10", pets: []}

const newPetEntity: PetEntity = {id: 1, nome: "Teste", especie: "Felina", raca: "SRD", sexo: "F", user: newUser}

describe('PetsService', () => {
  let petservice: PetsService;
  let petRepository: Repository<PetEntity>
  // let userService: UsersService;
  // let userRepository: Repository<UserEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetsService,
        UsersService,
        {
          provide: getRepositoryToken(PetEntity), 
          useValue: {
            save: jest.fn().mockReturnValueOnce(newPetEntity),
            create: jest.fn().mockResolvedValueOnce(newPetEntity),
          }
        }
      ],
    }).compile();

    petservice = module.get<PetsService>(PetsService);
    petRepository = module.get<Repository<PetEntity>>(getRepositoryToken(PetEntity))
  });

  it('should be defined', () => {
    expect(petservice).toBeDefined();
    expect(petRepository).toBeDefined();
  });

  describe('save e create', () => {
    it('save e create', async () => {
      jest.spyOn(petRepository, 'create')
      jest.spyOn(petRepository, 'save')

      const result = await petservice.save(newPetEntity, newUser);
      expect(result).toBeDefined()
    })   
  })
});
