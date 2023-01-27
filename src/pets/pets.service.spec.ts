import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { UserEntity } from 'users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { PetEntity } from './entities/pet.entity';
import { PetsService } from './pets.service';

describe('PetsService', () => {
  let petservice: PetsService;
  let petRepository: Repository<PetEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetsService,
        UsersService,
        {
          provide: getRepositoryToken(PetEntity), 
          useValue: {
            save: jest.fn(),
            create: jest.fn()
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

  describe('save', () => {
    it('salvar novo pet', async () => {
      const userData =  
      {
        id: 1,
        nome: "teste",
        sexo: "F",
        data_de_nascimento: "2000-05-05",
        cpf: "111.222.333-44",
        endereco: "aqui",
        pets: []
      }
      const petData = {  
        id: 1,
        nome: "teste",
        especie: "Canina",
        raca: "SRD",
        sexo: "F",
        user: userData
      }

      jest.spyOn(petRepository, 'create').mockReturnValueOnce(petData)
      jest.spyOn(petRepository, 'save').mockResolvedValueOnce(petData)

      const result = await petservice.save(petData, userData);
      expect(result).toBeDefined()
    })   
  })
});
